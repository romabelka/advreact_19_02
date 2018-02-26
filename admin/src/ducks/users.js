import {appName} from '../config'
import {List} from 'immutable'
import {reset} from 'redux-form'

/**
 * Constants
 * */
export const moduleName = 'users'
export const formName = 'userAdd'
const prefix = `${appName}/${moduleName}`

export const USER_ADD_START = `${prefix}/USER_ADD_START`
export const USER_ADD_SUCCESS = `${prefix}/USER_ADD_SUCCESS`

/**
 * Reducer
 * */
export default function reducer(state = List([]), action) {
	const {type, payload} = action

	switch (type) {
		case USER_ADD_SUCCESS:
			return state.push(payload)
		default:
			return state
	}
}

/**
 * Selectors
 * */
export const usersSelector = state => state[moduleName]

/**
 * Action Creators
 * */

export function userAdd(firstName, lastName, email) {
	return (dispatch) => {
		dispatch({
			type: USER_ADD_START,
			payload: { firstName, lastName, email }
		})

		dispatch({
			type: USER_ADD_SUCCESS,
			payload: { firstName, lastName, email }
		})

		dispatch(reset(formName))
	}
}
