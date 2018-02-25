import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import {reducer as form} from 'redux-form'
import authReducer, {moduleName as authModule} from '../ducks/auth'
import personReducer, {moduleName as personModule} from '../ducks/person'

export default combineReducers({
    router, form,
    [authModule]: authReducer,
    [personModule]: personReducer
})