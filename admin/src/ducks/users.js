import { appName } from '../config';
import { Record, OrderedMap } from 'immutable';
import { reset, SubmissionError } from 'redux-form';

/**
 * Constants
 * */
export const moduleName = 'users';
const prefix = `${appName}/${moduleName}`;

export const ADD_USER = `${prefix}/ADD_USER`;

/**
 * Reducer
 * */
export const userRecord = Record({
	id: null,
	first: '',
	last: '',
	email: '',
});

export const ReducerRecord = Record({
	entities: new OrderedMap({}),
});

export default function reducer(state = new ReducerRecord(), action) {
	const {type, payload, randomId} = action;

	switch (type) {
		case ADD_USER:
			return state.setIn(['entities', randomId], new userRecord({
				...payload,
				id: randomId,
			}));
		default:
			return state;
	}
}

/**
 * Action Creators
 * */

export function addUser(first, last, email) {
	return (dispatch, getState) => {
		if (getState().users.entities.some(p => p.email === email)) {
			throw new SubmissionError({
				email: 'Email is already registered',
			});
		}

		dispatch(reset('add-user-form'));

		dispatch({
			type: ADD_USER,
			payload: {first, last, email},
			generateId: true,
		});

	};
}
