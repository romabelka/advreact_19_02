import {put, call, take, apply, all, takeEvery} from 'redux-saga/effects'
import {SIGN_IN_REQUEST, SIGN_IN_START, SIGN_IN_SUCCESS, SIGN_IN_ERROR, SIGN_UP_REQUEST, SIGN_UP_START, SIGN_UP_SUCCESS, saga, signInSaga, signUpSaga} from './auth'
import firebase from 'firebase'
import history from '../history'

describe('Auth duck', () => {
	const person = { email: 'webvictor86@gmail.com', password: 'advreact' }

	// Также не понял, как протестировать сагу, содержащую другие саги внутри
	it('saga array', () => {
		const sagaGen = saga()

		expect(sagaGen.next().value).toEqual(all([
			signInSaga(),
			takeEvery(SIGN_UP_REQUEST, signUpSaga)
		]))
    });



    it('should sign in', () => {

	    const action = {
		    type: SIGN_IN_REQUEST,
		    payload: person
	    }

	    const sagaGen = signInSaga(action)

	    expect(sagaGen.next().value).toEqual(take(SIGN_IN_REQUEST))

	    expect(sagaGen.next(action).value).toEqual(put({
		    type: SIGN_IN_START,
		    payload: person
	    }))

	    const auth = firebase.auth()

	    expect(sagaGen.next().value).toEqual(call([auth, auth.signInWithEmailAndPassword], action.payload.email, action.payload.password))

        const user = {
            id: '123',
            email: action.payload.email
        }

	    expect(sagaGen.next(user).value).toEqual(put({
		    type: SIGN_IN_SUCCESS,
		    payload: user
	    }))

	    expect(sagaGen.next().value).toEqual(call(history.push, '/people'))
    });

	it('should fail sign in', () => {

		const action = {
			type: SIGN_IN_REQUEST,
			payload: person
		}

		const sagaGen = signInSaga(action)

		expect(sagaGen.next().value).toEqual(take(SIGN_IN_REQUEST))

		expect(sagaGen.next(action).value).toEqual(put({
			type: SIGN_IN_START,
			payload: person
		}))

		const auth = firebase.auth()

		expect(sagaGen.next().value).toEqual(call([auth, auth.signInWithEmailAndPassword], action.payload.email, action.payload.password))

        // Тут я не очень понял, как тестировать ошибку. По идее firebase возвращает rejected промис
        /*const error = new Error("провал")
		const requestFail = new Promise((resolve, reject) => {
        }).reject(error)

		expect(sagaGen.next(requestFail).value).toEqual(put({
			type: SIGN_IN_ERROR,
			error: error
		}))*/
	});





	it('should sign up', () => {

		const action = {
			type: SIGN_UP_START,
			payload: person
		}

		const sagaGen = signUpSaga(action)

		expect(sagaGen.next(action).value).toEqual(put(action))

		const auth = firebase.auth()

		expect(sagaGen.next().value).toEqual(apply(auth, auth.createUserWithEmailAndPassword, [action.payload.email, action.payload.password]))

		const user = {
			id: '123',
			email: action.payload.email
		}

		expect(sagaGen.next(user).value).toEqual(put({
			type: SIGN_UP_SUCCESS,
			payload: user
		}))

		expect(sagaGen.next().value).toEqual(call(history.push, '/people'))
	});

	it('should fail sign up', () => {

		const action = {
			type: SIGN_UP_START,
			payload: person
		}

		const sagaGen = signUpSaga(action)

		expect(sagaGen.next(action).value).toEqual(put(action))

		const auth = firebase.auth()

		expect(sagaGen.next().value).toEqual(apply(auth, auth.createUserWithEmailAndPassword, [action.payload.email, action.payload.password]))

		// Опять же нужно протестировать промис
	});
});