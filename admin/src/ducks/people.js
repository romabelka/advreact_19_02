import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'
import { reset, SubmissionError } from 'redux-form'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const ADD_PERSON = `${prefix}/ADD_PERSON`

/**
 * Reducer  
 * */
export const PersonRecord = Record({
    id: null,
    firstName: '',
    lastName: '',
    email: '',
})

export const ReducerRecord = Record({
    entities: new OrderedMap({}),
})

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload, randomId } = action
    switch (type) {
        case ADD_PERSON:
            return state.setIn(['entities', randomId], new PersonRecord({
                ...payload,
                id: randomId,
            }))
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

export function addPerson({ firstName, lastName, email }) {
    return (dispatch, getState) => {

        if (getState().people.entities.some(p => p.email === email)) {
            throw new SubmissionError({
                email: 'Email is already registered',
            })
        }

        dispatch(reset('addPeople'))

        dispatch({
            type: ADD_PERSON,
            payload: { firstName, lastName, email },
            generateId: true,
        })

    }
}
