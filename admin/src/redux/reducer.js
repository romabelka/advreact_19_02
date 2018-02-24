import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import {reducer as form} from 'redux-form'
import authReducer, {moduleName as authModule} from '../ducks/auth'
import addCustomerReducer, {moduleName as addCustomerModule} from '../ducks/add-customer'

export default combineReducers({
    router, form,
    [authModule]: authReducer,
    [addCustomerModule]: addCustomerReducer
})