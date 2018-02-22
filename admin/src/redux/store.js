import {createStore, applyMiddleware} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import logger from 'redux-logger'
import reducer from './reducer'
import history from '../history'

const enhancer = applyMiddleware(routerMiddleware(history), logger)

const store = createStore(reducer, enhancer)

window.store = store

export default store