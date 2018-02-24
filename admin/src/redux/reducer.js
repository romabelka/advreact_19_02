import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import {reducer as form} from 'redux-form'
import authReducer, {moduleName as authModule} from '../ducks/auth'
import clientReducer, {moduleName as clientModule} from '../ducks/client'

export default combineReducers({
    router,
    form,
    [authModule]: authReducer,
    [clientModule]: clientReducer
})