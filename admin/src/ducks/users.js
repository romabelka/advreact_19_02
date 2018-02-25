import { appName } from '../config'
import { List, fromJS } from 'immutable'
import { reset, setSubmitFailed } from 'redux-form'

/**
 * Constants
 * */
export const moduleName = 'manage-users'
const prefix = `${appName}/${moduleName}`

export const CREATE_USER_START = `${prefix}/CREATE_USER_START`
export const CREATE_USER_SUCCESS = `${prefix}/CREATE_USER_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = List

export default function reducer(state = new ReducerRecord(), action) {
    const { type, payload } = action

    switch (type) {
        case CREATE_USER_SUCCESS:
            return state.push(fromJS(payload))
        default:
            return state
    }
}

/**
 * Selectors
 * */
export const usersListSelector = state => state[moduleName]
export const userNameSelector = (user) => `${user.get('firstName')} ${user.get('lastName')}`
export const userEmailSelector = (user) => user.get('email')

/**
 * Action Creators
 * */
export function addUser(firstName, lastName, email) {
    return (dispatch) => {
        dispatch({
            type: CREATE_USER_START,
            payload: { firstName, lastName, email }
        })

        const user = { id: email, firstName, lastName, email }

        postNewUserAsync(user)
            .then(
                _ => {
                    dispatch({ type: CREATE_USER_SUCCESS, payload: user })
                    dispatch(reset('addUser'))
                },
                error => dispatch(setSubmitFailed('addUser', 'userName'))
            )
    }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const postNewUserAsync = (user) => {
    return sleep(1000).then(() => {
        if (user.firstName === 'qwert') {
            throw new Error('That username is taken')
        }
    })
}

