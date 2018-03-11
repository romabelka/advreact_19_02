import {appName} from '../config'
import {Record, OrderedMap} from 'immutable'
import {createSelector} from 'reselect'
import {put, call, all, takeEvery, select} from 'redux-saga/effects'
import {reset} from 'redux-form'
import firebase from 'firebase'
import {fbToEntities} from './utils'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON = `${prefix}/ADD_PERSON`
export const ADD_PERSON_START = `${prefix}/ADD_PERSON_START`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`


export const DEL_PERSON_REQUEST = `${prefix}/DEL_PERSON_REQUEST`
export const DEL_PERSON_START = `${prefix}/DEL_PERSON_START`
export const DEL_PERSON_SUCCESS = `${prefix}/DEL_PERSON_SUCCESS`


export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const ADD_EVENT = `${prefix}/ADD_EVENT`
export const ADD_EVENT_START = `${prefix}/ADD_EVENT_START`
export const ADD_EVENT_SUCCESS = `${prefix}/ADD_EVENT_SUCCESS`

/**
 * Reducer
 * */
const ReducerState = Record({
    entities: new OrderedMap({})
})

const PersonRecord = Record({
    uid: null,
    firstName: null,
    lastName: null,
    email: null,
    events: new OrderedMap()
})

export default function reducer(state = new ReducerState(), action) {
    const {type, payload} = action

    switch (type) {
        case ADD_PERSON_SUCCESS:
            return state.setIn(['entities', payload.uid],new PersonRecord(payload))

        case FETCH_ALL_SUCCESS:
            return state.set('entities', fbToEntities(payload, PersonRecord))

        case ADD_EVENT_SUCCESS:
            return state.setIn(['entities', payload.personUid, 'events', payload.eventUid], true)

        case DEL_PERSON_SUCCESS:
            return state.deleteIn(['entities', payload])

        default:
            return state
    }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName]
export const entitiesSelector = createSelector(stateSelector, state => state.entities)
export const peopleListSelector = createSelector(entitiesSelector, entities => entities.valueSeq().toArray())
export const idSelector = (_, props) => props.id
export const personSelector = createSelector(entitiesSelector, idSelector, (entities, id) => entities.get(id))
export const eventsSelector = createSelector(personSelector, person => person.events)

/**
 * Action Creators
 * */

export function addPerson(person) {
    return {
        type: ADD_PERSON,
        payload: { person }
    }
}

export function delPerson(uid) {
    return {
        type: DEL_PERSON_REQUEST,
        payload: { uid }
    }
}



export function fetchAllPeople() {
    return {
        type: FETCH_ALL_REQUEST
    }
}

export function addEventToPerson(eventUid, personUid) {
    return {
        type: ADD_EVENT,
        payload: { eventUid, personUid }
    }
}

/**
 * Sagas
 */

export function * addPersonSaga(action) {

    yield put({
        type: ADD_PERSON_START,
        payload: { ...action.payload.person }
    })

    const peopleRef = firebase.database().ref('people')

    const { key } = yield call([peopleRef, peopleRef.push], action.payload.person)

    yield put({
        type: ADD_PERSON_SUCCESS,
        payload: { uid: key , ...action.payload.person }
    })

    yield put(reset('person'))
}

export function * delPersonSaga(action) {

    yield put({
        type: DEL_PERSON_START,
        payload:  action.uid
    })

    const peopleRef = firebase.database().ref('people').child(action.payload.uid)

    yield call([peopleRef, peopleRef.remove])

    yield put({
        type: DEL_PERSON_SUCCESS,
        payload: action.payload.uid
    })

}


export function * fetchAllSaga() {
    const peopleRef = firebase.database().ref('people')

    const data = yield call([peopleRef, peopleRef.once], 'value')

    yield put({
        type: FETCH_ALL_SUCCESS,
        payload: data.val()
    })
}

export function * addEventSaga(action) {
    yield put({
        type: ADD_EVENT_START,
        payload: action.payload
    })

    const {eventUid, personUid} = action.payload
    const state = yield select(eventsSelector, {id: personUid})

    if (!state || !state.get(eventUid)) {
        const peopleRef = firebase.database().ref(`people/${personUid}/events/${eventUid}`);
        yield call([peopleRef, peopleRef.set], true);
        yield put({
            type: ADD_EVENT_SUCCESS,
            payload: action.payload
        })
    }


}

export const saga = function * () {
    yield all([
        takeEvery(ADD_PERSON, addPersonSaga),
        takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
        takeEvery(ADD_EVENT, addEventSaga),
        takeEvery(DEL_PERSON_REQUEST, delPersonSaga)
    ])
}