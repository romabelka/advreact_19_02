import {appName} from '../config'
import {Record, List} from 'immutable'
import {reset} from 'redux-form'
import {createSelector} from 'reselect'
import {takeEvery, put, call} from 'redux-saga/effects'
import {fbToEntities} from './utils'
import firebase from 'firebase'
import {EventRecord} from "./events";

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

export const LOAD_PERSONS_REQUEST = `${prefix}/LOAD_PERSONS_REQUEST`
export const LOAD_PERSONS_SUCCESS = `${prefix}/LOAD_PERSONS_SUCCESS`

/**
 * Reducer
 * */
const ReducerState = Record({
    entities: new List([]),
    loading: true,
    loaded: false
})

const PersonRecord = Record({
    uid: null,
    firstName: null,
    lastName: null,
    email: null
})

export default function reducer(state = new ReducerState(), action) {
    const {type, payload} = action

    switch (type) {
        case ADD_PERSON_SUCCESS:
            return state.update('entities', entities => entities.push(payload))

        case LOAD_PERSONS_SUCCESS:
            return state
                .set('loading', false)
                .set('loaded', true)
                .set('entities', fbToEntities(payload, PersonRecord))

        default:
            return state
    }
}
/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const peopleSelector = createSelector(stateSelector, state => state.entities.toArray())

/**
 * Action Creators
 * */

export function addPerson(person) {
    return {
        type: ADD_PERSON_REQUEST,
        payload: person
    }
}

export function loadPersons() {
    return {
        type: LOAD_PERSONS_REQUEST
    }
}

/*
export function addPerson(person) {
    return (dispatch) => {
        dispatch({
            type: ADD_PERSON,
            payload: {
                person: {id: Date.now(), ...person}
            }
        })

        dispatch(reset('person'))
    }
}
*/

/**
 * Sagas
 **/

export const addPersonSaga = function * (action) {
    const ref = firebase.database().ref('/people')
    console.log('---payload', action.payload)
    const user = yield call([ref, ref.push], action.payload)
    console.log('---id', user)

    yield put({
        type: ADD_PERSON_SUCCESS,
        payload: {uid: user.key(), }
    })

    yield put(reset('person'))

}

export const saga = function * () {
    yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
}