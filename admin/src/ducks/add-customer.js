/**
 * Created by alex_kart on 22.02.2018.
 */
import {appName} from '../config'
import {List} from 'immutable'
import {reset} from 'redux-form'
import {formName} from '../components/customers/add-customer-form'

/**
 * Constants
 * */
export const moduleName = 'addCustomer'
const prefix = `${appName}/${moduleName}`

export const ADD_CUSTOMER_SUBMIT = `${prefix}/ADD_CUSTOMER_SUBMIT`

/**
 * Reducer
 * */

export default function reducer(state = new List(), action) {
    const {type, payload} = action

    switch (type) {
        case ADD_CUSTOMER_SUBMIT:
            return state.push(payload)
        default:
            return state
    }
}

/**
 * Action Creators
 * */

export function addCustomer({lastName, firstName, email}) {
    return (dispatch) => {
        dispatch({
            type: ADD_CUSTOMER_SUBMIT,
            payload: { lastName, firstName, email }
        })
        dispatch(reset(formName))
    }
}