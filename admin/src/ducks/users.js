import { appName } from '../config'
import { List, fromJS } from 'immutable'
import { reset } from 'redux-form'

/**
 * Constants
 * */
export const moduleName = 'users'
const prefix = `${appName}/${moduleName}`

export const ADD_USER = `${prefix}/ADD_USER`

/**
 * Reducer
 * */
export default function reducer(state = new List(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_USER:
      return state.push(fromJS(payload))

    default:
      return state
  }
}

/**
 * Action Creators
 * */
export function addUser(firstName, lastName, email) {
  return (dispatch) => {
    dispatch({
      type: ADD_USER,
      payload: { firstName, lastName, email }
    })

    dispatch(reset('addUser'))
  }
}
