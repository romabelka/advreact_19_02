import firebase from 'firebase'
import {put, apply, take, call} from 'redux-saga/effects'
import {SIGN_UP_START, SIGN_UP_SUCCESS, SIGN_UP_ERROR} from './auth'
import {SIGN_IN_REQUEST, SIGN_IN_START, SIGN_IN_SUCCESS, SIGN_IN_ERROR} from './auth'
import {signUpSaga, signInSaga} from './auth'
import {push} from 'react-router-redux'


describe('Auth duck', () => {
    const testUser = {email: 'test@example.com', password: '1234'}

    it('sign up success', () => {

        const genSaga = signUpSaga({payload: testUser})

        const action = {
            type: SIGN_UP_START,
            payload: testUser
        }

        expect(genSaga.next().value).toEqual(put(action))

        const auth = firebase.auth()

        const user = genSaga.next().value
        expect(user).toEqual(apply(auth, auth.createUserWithEmailAndPassword, [testUser.email, testUser.password]))

        const action1 = {
            type: SIGN_UP_SUCCESS,
            payload: user
        }
        expect(genSaga.next(user).value).toEqual(put(action1))
    });

    it('sign up fail', () => {

        const genSaga = signUpSaga({payload: testUser})

        const action = {
            type: SIGN_UP_START,
            payload: testUser
        }

        expect(genSaga.next().value).toEqual(put(action))

        const err = new Error('aaa')
        //Этот next вернет то что вычислилось во втором yield
        genSaga.next()
        const action1 = {
            type: SIGN_UP_ERROR,
            error: err
        }
        //А это вместо результата и продолжения вычислений зарейзит ошибку
        expect(genSaga.throw(err).value).toEqual(put(action1))
    });

    it('sign in success' , () => {
        const genSaga = signInSaga()
        expect(genSaga.next().value).toEqual(take(SIGN_IN_REQUEST))
        const action = {
            type: SIGN_IN_START,
            payload: testUser
        }
        expect(genSaga.next({payload: testUser}).value).toEqual(put(action))
        const auth = firebase.auth()
        const user = call([auth, auth.signInWithEmailAndPassword], testUser.email, testUser.password)
        expect(genSaga.next().value).toEqual(user)
        const action1 = {
            type: SIGN_IN_SUCCESS,
            payload: user
        }
        expect(genSaga.next(user).value).toEqual(put(action1))
        expect(genSaga.next().value).toEqual(put(push('/people')))
    })

    it('sign in failed' , () => {
        const genSaga = signInSaga()
        expect(genSaga.next().value).toEqual(take(SIGN_IN_REQUEST))
        const action = {
            type: SIGN_IN_START,
            payload: testUser
        }

        expect(genSaga.next({payload: testUser}).value).toEqual(put(action))


        const error = new Error('aaa')
        const action1 = {
            type: SIGN_IN_ERROR,
            error
        }
        genSaga.next()
        expect(genSaga.throw(error).value).toEqual(put(action1))


    })
});