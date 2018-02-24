import {appName} from '../config'
import {Record} from 'immutable'

/**
 * Constants
 * */
export const moduleName = 'client'
const prefix = `${appName}/${moduleName}`

export const CLIENT_INIT = `${prefix}/CLIENT_INIT`
export const CLIENT_UPDATE = `${prefix}/CLIENT_UPDATE`
export const CLIENT_ADD = `${prefix}/CLIENT_ADD`
export const CLIENT_ADD_SUCCESS = `${prefix}/CLIENT_ADD_SUCCESS`

const getNewClient = () => ({
    'firstName' :  null,
    'lastName' : null,
    'email' : null,
})

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    client: {}
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case CLIENT_INIT:
            return state.set('client', payload)
        case CLIENT_UPDATE:
            return state.set('client', payload)
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

export const clientInit = (props) => ({
    type: CLIENT_INIT,
    payload: getNewClient()
})

export const clientUpdate = (client) => ({
    type: CLIENT_UPDATE,
    payload: client
})