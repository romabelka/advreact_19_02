import {appName} from '../config'
import {Record} from 'immutable'

/**
 * Constants
 * */
export const moduleName = 'client'
const prefix = `${appName}/${moduleName}`

export const CLIENT_ADD_SUCCESS = `${prefix}/CLIENT_ADD_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    client: {}
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case CLIENT_ADD_SUCCESS:
            return state.set('client', payload)
        default:
            return state
    }
}

/**
 * Selectors
 * */
export const userSelector = state => state[moduleName].client

/**
 * Action Creators
 * */

export const clientSubmit = (props) => ({
    type: CLIENT_ADD_SUCCESS,
    payload: props
})