import {appName} from '../config'
import {Record, Map} from 'immutable'
import {reset} from 'redux-form';

/**
 * Constants
 * */
export const moduleName = 'person'
const prefix = `${appName}/${moduleName}`

export const PERSON_ADD_START = `${prefix}/PERSON_ADD_START`
export const PERSON_ADD_SUCCESS = `${prefix}/PERSON_ADD_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
	fname: '',
	lname: '',
	email: ''
})

export default function reducer(state = new Map(), action) {
	const {type, payload} = action

	switch (type) {
		case PERSON_ADD_SUCCESS:
			return state.set(payload.email, new ReducerRecord(payload))
		default:
			return state
	}
}

/**
 * Action Creators
 * */

export function personAdd(fields) {
	return (dispatch) => {
		dispatch({
			type: PERSON_ADD_START,
			payload: fields
		})

		// TODO firebase

		dispatch({
			type: PERSON_ADD_SUCCESS,
			payload: fields
		})
		dispatch(reset('person'));
	}
}