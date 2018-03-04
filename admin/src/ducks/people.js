import {appName} from '../config'
import {Record, OrderedMap} from 'immutable'
import {reset} from 'redux-form'
import {createSelector} from 'reselect'
import {takeEvery, put, call, all, takeLatest} from 'redux-saga/effects'
import {fbToEntities} from './utils'
import firebase from 'firebase'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

export const LOAD_PERSONS_REQUEST = `${prefix}/LOAD_PERSONS_REQUEST`
export const LOAD_PERSONS_START = `${prefix}/LOAD_PERSONS_START`
export const LOAD_PERSONS_SUCCESS = `${prefix}/LOAD_PERSONS_SUCCESS`

/**
 * Reducer
 * */
const ReducerState = Record({
    entities: new OrderedMap({}),
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
            return state.update('entities', entities => entities.set(payload.uid, payload))

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
export const peopleSelector = createSelector(stateSelector, state => state.entities.valueSeq().toArray())

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
    const user = yield call([ref, ref.push], action.payload)

    yield put({
        type: ADD_PERSON_SUCCESS,
        payload: {uid: user.key, ...action.payload}
    })

    yield put(reset('person'))

}


export function* fetchAllSaga() {
    const ref = firebase.database().ref('/people')

    yield put({
        type: LOAD_PERSONS_START
    })

    const snapshot = yield call([ref, ref.once], 'value')

    yield put({
        type: LOAD_PERSONS_SUCCESS,
        payload: snapshot.val()
    })
}

export const saga = function * () {
    yield all([
        takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
        takeLatest(LOAD_PERSONS_REQUEST, fetchAllSaga)
    ])
}