import {put, call, take, apply} from 'redux-saga/effects'
import {
    redirectSaga,
    ReducerRecord, SIGN_IN_ERROR,
    SIGN_IN_REQUEST,
    SIGN_IN_START,
    SIGN_IN_SUCCESS,
    SIGN_UP_ERROR,
    SIGN_UP_REQUEST,
    SIGN_UP_START,
    SIGN_UP_SUCCESS,
    signInSaga, signUpSaga,
    userSelector
} from "./auth";
import reducer from "./auth";
import firebase from 'firebase'
import {push} from 'react-router-redux'
import {PeopleRoute} from "../App";

describe('Auth duck', () => {
    describe('reducer', () => {
        let state = null
        let user = null
        let action = null
        beforeEach(() => {
            state = new ReducerRecord()
            user = {testMarker: 'success'}
            action = {
                type: SIGN_UP_SUCCESS,
                payload: user
            }
        });
        it('should initialize state with empty user', () => {
            const resultState = reducer(undefined, {type: 'INIT', payload: {}})

            expect(resultState).toBeDefined()
            expect(userSelector({auth: resultState})).toEqual(null)
        });
        it('should add user on SIGN_UP_SUCCESS', () => {
            const resultState = reducer(state, action)

            expect(resultState).not.toEqual(state)
            expect(userSelector({auth: resultState}).testMarker).toEqual('success')
        });
        it('should add user on SIGN_IN_SUCCESS', () => {
            action.type = SIGN_IN_SUCCESS
            const resultState = reducer(state, action)

            expect(resultState).not.toEqual(state)
            expect(userSelector({auth: resultState}).testMarker).toEqual('success')
        });
        it('should not change user on other actions', () => {
            action.type = SIGN_UP_ERROR
            const resultState = reducer(state, action)

            expect(resultState).toEqual(state)
        });
    });
    describe('signInSaga', () => {
        it('should allow to sign in', () => {
            const payload = {password: '123', email: 'test@example.com'}
            const action = {
                type: SIGN_IN_REQUEST,
                payload
            }
            const sagaGenerator = signInSaga(action)

            expect(sagaGenerator.next().value).toEqual(take(SIGN_IN_REQUEST))

            expect(sagaGenerator.next(action).value).toEqual(put({
                type: SIGN_IN_START,
                payload
            }))

            const auth = firebase.auth()
            expect(sagaGenerator.next().value).toEqual(call(
                [auth, auth.signInWithEmailAndPassword],
                payload.email,
                payload.password
            ))

            const user = {userName: 'test'}
            expect(sagaGenerator.next(user).value).toEqual(put({
                type: SIGN_IN_SUCCESS,
                payload: user
            }))

            const newLoop = sagaGenerator.next()
            expect(newLoop.done).toEqual(false)
            expect(newLoop.value).toEqual(take(SIGN_IN_REQUEST))
        });
        it('should raise SIGN_IN_ERROR in case of error', () => {
            const action = {
                type: SIGN_IN_REQUEST,
                payload: {password: '123', email: 'test@example.com'}
            }

            const sagaGenerator = signInSaga(action)
            sagaGenerator.next()
            sagaGenerator.next(action)
            sagaGenerator.next()

            const ex = new Error('test')
            expect(sagaGenerator.throw(ex).value).toEqual(put({
                type: SIGN_IN_ERROR,
                error: ex
            }))

            const newLoop = sagaGenerator.next()
            expect(newLoop.done).toEqual(false)
            expect(newLoop.value).toEqual(take(SIGN_IN_REQUEST))
        });
    });
    describe('signUpSaga', () => {
        it('should allow to sign up', () => {
            const payload = {password: '123', email: 'test@example.com'}

            const action = {
                type: SIGN_UP_REQUEST,
                payload
            }
            const sagaGenerator = signUpSaga(action)

            expect(sagaGenerator.next().value).toEqual(put({
                type: SIGN_UP_START,
                payload
            }))

            const auth = firebase.auth()
            expect(sagaGenerator.next().value).toEqual(apply(
                auth,
                auth.createUserWithEmailAndPassword,
                ['test@example.com', '123']
            ))

            const user = {userName: 'test'}
            expect(sagaGenerator.next(user).value).toEqual(put({
                type: SIGN_UP_SUCCESS,
                payload: user
            }))

            expect(sagaGenerator.next().done).toEqual(true)
        });
        it('should raise SIGN_UP_ERROR in case of error', () => {
            const action = {
                type: SIGN_UP_REQUEST,
                payload: {password: '123', email: 'test@example.com'}
            }
            const sagaGenerator = signUpSaga(action)
            sagaGenerator.next()
            sagaGenerator.next()

            const ex = new Error('test')
            expect(sagaGenerator.throw(ex).value).toEqual(put({
                type: SIGN_UP_ERROR,
                error: ex
            }))

            expect(sagaGenerator.next().done).toEqual(true)
        });
    });
    describe('redirectSaga', () => {
        it('should redirect to people', () => {
            const sagaGenerator = redirectSaga()

            expect(sagaGenerator.next().value).toEqual(put(push(PeopleRoute)))
            expect(sagaGenerator.next().done).toEqual(true)
        });
    });
});