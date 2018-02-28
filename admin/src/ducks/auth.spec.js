import firebase from 'firebase'
import { put, call, take, apply } from 'redux-saga/effects'
import {
    SIGN_IN_REQUEST, SIGN_IN_START, SIGN_IN_SUCCESS, SIGN_IN_ERROR, signInSaga,
    SIGN_UP_REQUEST, SIGN_UP_START, SIGN_UP_SUCCESS, SIGN_UP_ERROR, signUpSaga,
    checkAuthSaga, connect
} from './auth'

describe('Auth duck', () => {
    const user = { email: 'test@example.com', password: '12312312' }
    const auth = firebase.auth()
    const error = new Error('Some Error')

    describe('should check auth saga', () => {

        it('success', () => {
            const sagaGen = checkAuthSaga()
    
            expect(sagaGen.next().value).toEqual(call(connect, auth))
    
            expect(sagaGen.next(user).value).toEqual(put({
                type: SIGN_IN_SUCCESS,
                payload: user
            }))
        })


        it('error', () => {
            const sagaGen = checkAuthSaga()
    
            expect(sagaGen.next().value).toEqual(call(connect, auth))

            expect(sagaGen.throw(error).value).toEqual(put({
                type: SIGN_IN_ERROR,
                error,
            }))
        })
    })


    describe('should sign in saga', () => {

        const action = {
            type: SIGN_IN_REQUEST,
            payload: user
        }

        it('success', () => {
            const sagaGen = signInSaga(action)

            expect(sagaGen.next().value).toEqual(take(SIGN_IN_REQUEST))

            expect(sagaGen.next(action).value).toEqual(put({
                type: SIGN_IN_START,
                payload: user
            }))

            expect(sagaGen.next().value).toEqual(call([auth, auth.signInWithEmailAndPassword],
                user.email, user.password,
            ))
        })

        it('error', () => {
            const sagaGen = signInSaga(action)

            expect(sagaGen.next().value).toEqual(take(SIGN_IN_REQUEST))

            expect(sagaGen.next(action).value).toEqual(put({
                type: SIGN_IN_START,
                payload: user
            }))

            expect(sagaGen.next().value).toEqual(call([auth, auth.signInWithEmailAndPassword],
                user.email, user.password,
            ))

            expect(sagaGen.throw(error).value).toEqual(put({
                type: SIGN_IN_ERROR,
                error,
            }))
        })
    })

    describe('should sign up saga', () => {
        it('success', () => {
            const action = {
                type: SIGN_UP_REQUEST,
                payload: user
            }
    
            const sagaGen = signUpSaga(action)
    
            expect(sagaGen.next().value).toEqual(put({
                type: SIGN_UP_START,
                payload: user
            }))
    
            expect(sagaGen.next().value).toEqual(apply(auth, auth.createUserWithEmailAndPassword, [user.email, user.password]))
    
            expect(sagaGen.next(user).value).toEqual(put({
                type: SIGN_UP_SUCCESS,
                payload: user
            }))
        })

        it('error', () => {
            const action = {
                type: SIGN_UP_REQUEST,
                payload: user
            }
    
            const sagaGen = signUpSaga(action)
    
            expect(sagaGen.next().value).toEqual(put({
                type: SIGN_UP_START,
                payload: user
            }))
    
            expect(sagaGen.next().value).toEqual(apply(auth, auth.createUserWithEmailAndPassword, [user.email, user.password]))
    
            expect(sagaGen.throw(error).value).toEqual(put({
                type: SIGN_UP_ERROR,
                error
            }))            
        })
    })
})