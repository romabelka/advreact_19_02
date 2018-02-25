import {appName} from '../config'
import {Record} from 'immutable'
import {reset} from 'redux-form'

/**
 * Constants
 * */
export const moduleName = 'customers'
const prefix = `${appName}/${moduleName}`

export const ADD_CUSTOMER_SUCCESS = `${prefix}/ADD_CUSTOMER_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  customer: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const {type, payload} = action

  switch (type) {
    case ADD_CUSTOMER_SUCCESS:
      return state.set('customer', payload)
    default:
      return state
  }
}

/**
 * Action Creators
 * */
export function addCustomer(firstName, lastName, email) {
  return (dispatch) => {
    dispatch({
      type: ADD_CUSTOMER_SUCCESS,
      payload: { firstName, lastName, email }
    })
  }
}