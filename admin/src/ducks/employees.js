import {appName} from '../config'
import {List} from 'immutable'
import {reset} from 'redux-form';

/**
 * Constants
 * */
export const moduleName = 'employee'
const prefix = `${appName}/${moduleName}`

export const CREATE_EMPLOYEE = `${prefix}/CREATE_EMPLOYEE`

/**
 * Reducer
 * */
export default function reducer(state = new List(), action) {
    const {type, payload} = action

    switch (type) {
        case CREATE_EMPLOYEE:
            return state.push( payload)
        default:
            return state
    }
}

/**
 * Selectors
 * */
export const employeesSelector = state => state[moduleName]

/**
 * Action Creators
 * */

export function createEmployee(firstName, lastName) {
    return (dispatch) => {
        dispatch({
            type: CREATE_EMPLOYEE,
            payload: { firstName, lastName }
        })

        dispatch(reset('employee'))
    }
}