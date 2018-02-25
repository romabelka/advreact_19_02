import {appName} from '../config'
import {Record, List} from 'immutable'
import {reset} from 'redux-form';

/**
 * Constants
 * */
export const moduleName = 'addUser'
const prefix = `${appName}/${moduleName}`

export const ADD_USER = `${prefix}/ADD_USER`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    addedUsers: List([])
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case ADD_USER:
            console.log(state.toJS());
            return state.update('addedUsers', arr => arr.push(payload))
        default:
            return state
    }

}

/**
 * Selectors
 * */
export const addedUsersSelector = state => state[moduleName].addedUsers

/**
 * Action Creators
 * */
export function addUser( email, firstName, lastName ) {
    return (dispatch) => {
        dispatch({
            type: ADD_USER,
            payload: { email, firstName, lastName }
        })
		dispatch(reset(moduleName));
    }
}

