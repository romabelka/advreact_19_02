import {appName} from '../config'
import { List, Map } from 'immutable'
import { reset } from 'redux-form'

/**
 * Constants
 * */
export const moduleName = 'users'
const prefix = `${appName}/${moduleName}`

export const USER_ADD = `${prefix}/USER_ADD`

/**
 * Reducer
 * */

export default function reducer(state = List(), action) {
	const {type, payload} = action

	switch (type) {
		case USER_ADD:
			return state.push(Map({ ...payload }))
		default:
			return state
	}
}

/**
 * Selectors
 * */

/**
 * Action Creators
 * */

export function addUser(user) {
	return (dispatch) => {
		dispatch({
			type: USER_ADD,
			payload: user
		})
		dispatch(reset('user'))
	}
}
