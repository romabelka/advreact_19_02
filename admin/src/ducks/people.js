import { appName } from '../config'
import { Record } from 'immutable'
import {reset} from 'redux-form'
/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const ADD_PEOPLE_START = `${prefix}/ADD_PEOPLE_START`
export const ADD_PEOPLE_SUCCESS = `${prefix}/ADD_PEOPLE_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    people: []
})

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action

    switch (type) {
        case ADD_PEOPLE_SUCCESS:
            return state.set('people', state.get('people').concat([payload]))
        default:
            return state
    }
}

/**
 * Selectors
 * */
export const peopleSelector = state => state[moduleName].people

/**
 * Action Creators
 * */

export function addPeople(firstName, lastName, email) {
    return (dispatch) => {
        dispatch({
            type: ADD_PEOPLE_START,
            payload: { firstName, lastName, email }
        })

        dispatch({
            type: ADD_PEOPLE_SUCCESS,
            payload: { firstName, lastName, email }
        })
        dispatch(reset('addPeopleForm'))
        
    }
}