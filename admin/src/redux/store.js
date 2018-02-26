import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducer';
import history from '../history';
import randomId from '../middlewares/randomId';

const enhancer = applyMiddleware(thunk, randomId, routerMiddleware(history), logger);

const store = createStore(reducer, enhancer);

window.store = store;

export default store;