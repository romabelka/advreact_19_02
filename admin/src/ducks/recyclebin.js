import {all, take, takeEvery, select, put, call} from 'redux-saga/effects'
import {appName} from '../config'
import {Record, Set} from 'immutable'
import {createSelector} from 'reselect'
import {delPerson} from './people'
import {delEvent} from './events'

/**
 * Constants
 * */
export const moduleName = 'recyclebin'
const prefix = `${appName}/${moduleName}`

export const ADD_PERSON  = `${prefix}/ADD_PERSON`


export const ADD_EVENT = `${prefix}/ADD_EVENT`

export const EMPTY_BIN_REQUEST = `${prefix}/EMPTY_BIN_REQUEST`
export const EMPTY_BIN_START = `${prefix}/EMPTY_BIN_START`
export const EMPTY_BIN_SUCCESS = `${prefix}/EMPTY_BIN_SUCCESS`



/**
 * Reducer
 * */
export const ReducerRecord = Record({
    peoples: new Set(),
    events: new Set()
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case ADD_PERSON:
            return state.update('peoples', set => set.add(payload.id) )

        case ADD_EVENT:
            return state.update('events', set => set.add(payload.id))

        case EMPTY_BIN_SUCCESS:
            return new ReducerRecord()

        default:
            return state
    }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const peopleSelector = createSelector(stateSelector, state => state.peoples)
export const peopleListSelector = createSelector(peopleSelector, peoples => peoples.toArray())
export const eventsSelector = createSelector(stateSelector, state => state.events)
export const eventListSelector = createSelector(eventsSelector, events => events.toArray())

/**
 * Action Creators
 * */


export function personToBin(id) {
    return {
        type: ADD_PERSON,
        payload: { id }
    }
}

export function eventToBin(id) {
    return {
        type: ADD_EVENT,
        payload: { id }
    }
}

export function emptyBin () {
    return {
        type: EMPTY_BIN_REQUEST,
        payload: null
    }
}

/**
 * Sagas
 **/



export const emptyBinSaga = function * () {
    yield  put({
        type: EMPTY_BIN_START
    })

    const events = yield select(eventsSelector);
    const people = yield select(peopleSelector)

    for (let personId of people)
        yield put(delPerson(personId))

    for (let eventId of events)
        yield put(delEvent(eventId))

    //Как сделать чтобы EMPTY_BIN_SUCCESS вызывался только после успешного удаления
    //всех ивентов и людей?
    yield  put({
        type: EMPTY_BIN_SUCCESS
    })

}


/*export function * delPersonSaga(action) {

    yield put({
        type: ADD_PERSON_START,
        payload: action.uid
    })

    yield put(delPerson(action.uid))

    yield put({
        type: ADD_PERSON_SUCCESS,
        payload: action.uid
    })

 }*/


export const saga = function * () {
    yield all([
        takeEvery(EMPTY_BIN_REQUEST, emptyBinSaga)
    ])
}