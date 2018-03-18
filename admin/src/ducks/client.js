import {appName} from '../config'
import {Record} from 'immutable'
import {reset} from 'redux-form';

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
    client: []
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action
    let client = state.get('client')
    switch (type) {
        case CLIENT_ADD_SUCCESS:{
            console.log(payload)
            return state.set('client', client.concat([payload]))
        }

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

export const clientSubmit = (props) => {
    return (dispatch) => {
        dispatch({
            type: CLIENT_ADD_SUCCESS,
            payload: props
        })

        dispatch(reset('client'))
    }
}