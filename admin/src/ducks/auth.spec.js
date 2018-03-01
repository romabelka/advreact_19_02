import {apply, call, put, take} from 'redux-saga/effects'
import firebase from 'firebase'
import { push } from 'react-router-redux'
import {
	SIGN_IN_REQUEST, SIGN_IN_START, SIGN_IN_SUCCESS, SIGN_UP_REQUEST, SIGN_UP_START, SIGN_UP_SUCCESS, signInSaga,
	signUpSaga
} from './auth';

describe('Auth duck', () => {
	it('should singIn with success', () => {
		const payload = { email: 'max@m.ru', password: 'qwertyyy'};
		const sagaGen = signInSaga();

		expect(sagaGen.next().value).toEqual(take(SIGN_IN_REQUEST));

		expect(sagaGen.next({ payload }).value).toEqual(put({
			type: SIGN_IN_START,
			payload
		}));

		const auth = firebase.auth();

		expect(sagaGen.next().value).toEqual(call([auth, auth.signInWithEmailAndPassword], payload.email, payload.password));

		expect(sagaGen.next().value).toEqual(put({
			type: SIGN_IN_SUCCESS,
			payload: undefined
		}));

		expect(sagaGen.next().value).toEqual(put(push('/people')));

		expect(sagaGen.next().value).toEqual(take(SIGN_IN_REQUEST));
	});

	it('should signUp with success', () => {
		const payload = { email: 'max@m.ru', password: 'qwertyyy'};
		const action = {
			type: SIGN_UP_REQUEST,
			payload
		};
		const sagaGen = signUpSaga(action);

		expect(sagaGen.next().value).toEqual(put({
			type: SIGN_UP_START,
			payload
		}));

		const auth = firebase.auth();

		expect(sagaGen.next().value).toEqual(apply(
			auth,
			auth.createUserWithEmailAndPassword,
			[payload.email, payload.password]
		));

		expect(sagaGen.next().value).toEqual(put({
			type: SIGN_UP_SUCCESS,
			payload: undefined
		}));

		expect(sagaGen.next().done).toEqual(true);
	});
});