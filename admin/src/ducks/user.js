import {appName} from '../config'
import { Record, OrderedMap } from 'immutable'
import { reset } from 'redux-form'

/**
 * Constants
 * */
export const moduleName = 'addUser'
const prefix = `${appName}/${moduleName}`

export const ADD_USER = `${prefix}/ADD_USER`

/**
 * Reducer
 * */
export const UserRecord = Record({
    userId: null,
    userFirstName: null,
    userLastName: null,
    userEmail: null,
});
export const ReducerRecord = Record({
        users: new OrderedMap({}),
});

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload, createdId} = action;

    switch (type) {
        case ADD_USER:
            return state.setIn(['users', createdId], new UserRecord({
                userId: createdId,
                ...payload,
            }));
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

export function addUser(userFirstName, userLastName, userEmail) {
    return dispatch => {
        dispatch(reset('addUser'));
        dispatch({
            type: ADD_USER,
            payload: { userFirstName, userLastName, userEmail },
            createdId: true
        })
    }
}
