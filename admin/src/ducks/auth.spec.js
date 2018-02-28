import firebase from 'firebase'
import { apply, call, put, take } from 'redux-saga/effects'
import reducer, {
    moduleName, ReducerRecord,
    userSelector, signInSaga, signUpSaga,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS,
    SIGN_IN_REQUEST, SIGN_IN_SUCCESS,
    SIGN_UP_START, SIGN_UP_ERROR,
    SIGN_IN_START, SIGN_IN_ERROR,
} from './auth'

describe('Auth duck', () => {

    describe('Reducer', () => {
        const user = { name: "Test", email: "test@test.com" }
        const state = new ReducerRecord()
        it('should add user to state upon sign in', () => {
            const action = { type: SIGN_IN_SUCCESS, payload: user }
            expect(reducer(state, action).user).toEqual(user)

        })
        it('should add user to state upon sign up', () => {
            const action = { type: SIGN_UP_SUCCESS, payload: user }
            expect(reducer(state, action).user).toEqual(user)
        })
    })

    describe('Selectors', () => {
        const user = { name: "Test", email: "test@test.com" }
        const state = { [moduleName]: new ReducerRecord({ user }) }
        it('should return user', () => {
            expect(userSelector(state)).toEqual(user)
        })
    })

    describe('signUpSaga', () => {
        const user = { email: "test@test.com", password: "1234567890" }
        const action = {
            type: SIGN_UP_REQUEST,
            payload: user,
        }
        const auth = firebase.auth()

        it('should put SIGN UP SUCCESS action', () => {
            const sagaGen = signUpSaga(action)

            expect(sagaGen.next().value).toEqual(put({
                type: SIGN_UP_START,
                payload: user,
            }))

            expect(sagaGen.next().value).toEqual(apply(
                auth, auth.createUserWithEmailAndPassword,
                [user.email, user.password],
            ))

            expect(sagaGen.next(user).value).toEqual(put({
                type: SIGN_UP_SUCCESS,
                payload: user,
            }))

            expect(sagaGen.next().done).toEqual(true)

        })

        it('should put SIGN UP ERROR action', async () => {
            const sagaGen = signUpSaga(action)

            expect(sagaGen.next().value).toEqual(put({
                type: SIGN_UP_START,
                payload: user,
            }))

            expect(sagaGen.next().value).toEqual(apply(
                auth, auth.createUserWithEmailAndPassword,
                [user.email, user.password],
            ))
            const error = new Error('Some Error')
            expect(sagaGen.throw(error).value).toEqual(put({
                type: SIGN_UP_ERROR,
                error,
            }))

            expect(sagaGen.next().done).toEqual(true)
        })
    })

    describe('signInSaga', () => {
        const user = { email: "test@test.com", password: "1234567890" }
        const action = {
            type: SIGN_IN_REQUEST,
            payload: user,
        }
        const auth = firebase.auth()

        it('should put SIGN IN SUCCESS action', () => {
            const sagaGen = signInSaga(action)

            expect(sagaGen.next().value).toEqual(take(SIGN_IN_REQUEST))

            expect(sagaGen.next(action).value).toEqual(put({
                type: SIGN_IN_START,
                payload: user,
            }))

            expect(sagaGen.next().value).toEqual(call([
                    auth, auth.signInWithEmailAndPassword],
                user.email, user.password,
            ))

            expect(sagaGen.next(user).value).toEqual(put({
                type: SIGN_IN_SUCCESS,
                payload: user,
            }))

            // expect(sagaGen.next().done).toEqual(true)

        })

        it('should put SIGN IN ERROR action', async () => {
            const sagaGen = signInSaga(action)

            expect(sagaGen.next().value).toEqual(take(SIGN_IN_REQUEST))

            expect(sagaGen.next(action).value).toEqual(put({
                type: SIGN_IN_START,
                payload: user,
            }))

            expect(sagaGen.next().value).toEqual(call([
                    auth, auth.signInWithEmailAndPassword],
                user.email, user.password,
            ))

            const error = new Error('Some Error')
            expect(sagaGen.throw(error).value).toEqual(put({
                type: SIGN_IN_ERROR,
                error,
            }))

            // expect(sagaGen.next().done).toEqual(true)
        })
    })
})
