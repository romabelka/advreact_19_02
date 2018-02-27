import {put, apply, call, take} from 'redux-saga/effects'

import {
	SIGN_UP_START,
	SIGN_UP_SUCCESS,
	SIGN_IN_REQUEST,
	SIGN_IN_START,
	SIGN_IN_SUCCESS,
	signUpSaga,
	signInSaga
} from './auth'

import firebase from 'firebase'

describe('Auth duck', () => {
    it('should sign up', () => {
        const userData = { email: 'test@example.com', password: '12345678'}

        const action = {
			type: SIGN_UP_START,
			payload: {...userData}
		}
        const sagaGen = signUpSaga(action)

        expect(sagaGen.next().value).toEqual(put(action))

		const auth = firebase.auth()

		const userCall = apply(auth, auth.createUserWithEmailAndPassword, [userData.email, userData.password])
		const user = auth.createUserWithEmailAndPassword.apply(auth, [userData.email, userData.password])

		expect(sagaGen.next().value).toEqual(userCall)

		expect(sagaGen.next(user).value).toEqual(put({
			type: SIGN_UP_SUCCESS,
			payload: user
		}))

		expect(sagaGen.next().done).toEqual(true)
    });

    it('should sign in', () => {
        const userData = { email: 'test@example.com', password: '12345678'}

        const sagaGen = signInSaga()

        expect(sagaGen.next().value).toEqual(take(SIGN_IN_REQUEST))

        expect(sagaGen.next({payload: userData}).value).toEqual(put({
			type: SIGN_IN_START,
			payload: {...userData}
		}))

		const auth = firebase.auth()

		const userCall = call([auth, auth.signInWithEmailAndPassword], userData.email, userData.password)
		const user = auth.signInWithEmailAndPassword.call(auth, userData.email, userData.password)

		expect(sagaGen.next().value).toEqual(userCall)

		expect(sagaGen.next(user).value).toEqual(put({
			type: SIGN_IN_SUCCESS,
			payload: user
		}))

		// This saga is endless
		expect(sagaGen.next().value).toEqual(take(SIGN_IN_REQUEST))
    });

});