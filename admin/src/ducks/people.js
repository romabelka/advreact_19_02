import {appName} from '../config'
import {Record, OrderedMap} from 'immutable'
import {createSelector} from 'reselect'
import {put, call, all, select, takeEvery, take, fork, spawn, cancel, cancelled} from 'redux-saga/effects'
import {delay, eventChannel} from 'redux-saga'
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

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const ADD_EVENT_REQUEST = `${prefix}/ADD_EVENT_REQUEST`
export const ADD_EVENT_SUCCESS = `${prefix}/ADD_EVENT_SUCCESS`

export const REMOVE_PERSON_REQUEST = `${prefix}/REMOVE_PERSON_REQUEST`
export const REMOVE_PERSON_SUCCESS = `${prefix}/REMOVE_PERSON_SUCCESS`

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
    events: []
})

export default function reducer(state = new ReducerState(), action) {
    const {type, payload} = action

    switch (type) {
        case FETCH_ALL_SUCCESS:
            return state.set('entities', fbToEntities(payload, PersonRecord))

        case ADD_EVENT_SUCCESS:
            return state.setIn(['entities', payload.personUid, 'events'], payload.events)

        case REMOVE_PERSON_SUCCESS:
            return state.deleteIn(['entities', payload.uid])

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

/**
 * Action Creators
 * */

export function addPerson(person) {
    return {
        type: ADD_PERSON,
        payload: { person }
    }
}

export function fetchAllPeople() {
    return {
        type: FETCH_ALL_REQUEST
    }
}

export function addEventToPerson(eventUid, personUid) {
    return {
        type: ADD_EVENT_REQUEST,
        payload: { eventUid, personUid }
    }
}

export function removePerson(uid) {
    return {
        type: REMOVE_PERSON_REQUEST,
        payload: { uid }
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

export function * fetchAllSaga() {
    const peopleRef = firebase.database().ref('people')

    const data = yield call([peopleRef, peopleRef.once], 'value')

    yield put({
        type: FETCH_ALL_SUCCESS,
        payload: data.val()
    })
}

export function * addEventToPersonSaga({ payload: { eventUid, personUid } }) {
    const eventsRef = firebase.database().ref(`people/${personUid}/events`)

    const state = yield select(stateSelector)
    const events = state.getIn(['entities', personUid, 'events']).concat(eventUid)

    yield call([eventsRef, eventsRef.set], events)

    yield put({
        type: ADD_EVENT_SUCCESS,
        payload: { events, personUid }
    })
}

const createPeopleChannel = () => eventChannel(emit => {
    const callback = (data) => emit({ data })
    firebase.database().ref('people').on('value', callback)

    return () => firebase.database().ref('people').off('value', callback)
})

export function * syncRealtime() {
    const channel = yield call(createPeopleChannel)

    while (true) {
        const { data } = yield take(channel)

        yield put({
            type: FETCH_ALL_SUCCESS,
            payload: data.val()
        })
    }
}

export function *removePersonSaga(action) {
    const { uid } = action.payload
    const personRef = firebase.database().ref(`people/${uid}`)
    yield call([personRef, personRef.remove])

    yield put({
        type: REMOVE_PERSON_SUCCESS,
        payload: { uid },
    })
}


/*
export function * syncPeopleWithShortPolling() {
    let firstTime = true
    try {
        while (true) {
            if (!firstTime) throw new Error('ooops')

            yield call(fetchAllSaga)
            firstTime = false
            yield delay(2000)
        }
    } finally {
        if (yield cancelled()) {
            console.log('---', 'saga was cancelled')
        }
    }
}
*/

/*
export function * cancellableSyncSaga() {
    const task = yield fork(syncPeopleWithShortPolling)
    yield race({
        sync: syncPeopleWithShortPolling(),
        timeout: delay(5000)
    })
/!*
    yield delay(5000)
    yield cancel(task)
*!/
}
*/

export const saga = function * () {
    yield spawn(syncRealtime)

    yield all([
        takeEvery(ADD_PERSON, addPersonSaga),
//        takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
        takeEvery(ADD_EVENT_REQUEST, addEventToPersonSaga),
        takeEvery(REMOVE_PERSON_REQUEST, removePersonSaga)
    ])
}
