import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import {reducer as form} from 'redux-form'
import authReducer, {moduleName as authModule} from '../ducks/auth'
import addUserReducer, {moduleName as addUserModule} from '../ducks/add-user'

export default combineReducers({
    router, form,
    [authModule]: authReducer,
    [addUserModule]: addUserReducer,
})