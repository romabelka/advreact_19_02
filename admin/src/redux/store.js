import {createStore, applyMiddleware} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import history from '../history'
import createId from '../middlewares/createId'
// import logger from 'redux-logger'

const enhancer = applyMiddleware(thunk, createId, routerMiddleware(history) ); // ,logger
const store = createStore(reducer, enhancer);

window.store = store;

export default store