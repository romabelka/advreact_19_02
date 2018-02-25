import {appName} from '../config'
import {Record, fromJS} from 'immutable'

/**
 * Constants
 * */
export const moduleName = 'admin'
const prefix = `${appName}/${moduleName}`

export const ADD_PERSON = `${prefix}/ADD_PERSON`

/**
 * Reducer
 * */

export const initialState = fromJS({
    persons: []
})

export default function reducer(state = initialState, {type, payload} = {}) {

    switch (type) {
        case ADD_PERSON:
            return state.update('persons', persons => persons.push(payload));
        default:
            return state
    }
}

/**
 * Selectors
 * */
export const personSelector = state => state[moduleName].persons

/**
 * Action Creators
 * */

export function addPerson(payload) {
    return (dispatch) => {
        dispatch({
            type: ADD_PERSON,
            payload
        })
    }
}
