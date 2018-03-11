import {appName} from '../config'
import {Record, OrderedMap} from 'immutable'
import {createSelector} from 'reselect'
import {put, call, all, takeEvery} from 'redux-saga/effects'
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

export const ADD_EVENT = `${prefix}/ADD_EVENT`
export const ADD_EVENT_SUCCESS = `${prefix}/ADD_EVENT_SUCCESS`

export const REMOVE_PERSON = `${prefix}/REMOVE_PERSON`
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
        case ADD_PERSON_SUCCESS:
            return state.setIn(['entities', payload.uid],new PersonRecord(payload))

        case FETCH_ALL_SUCCESS:
            return state.set('entities', fbToEntities(payload, PersonRecord))

        case REMOVE_PERSON_SUCCESS:
            return state.update('entities', entities => entities.delete(payload.uid) )

        case ADD_EVENT_SUCCESS:
            return state.setIn(['entities', payload.personUid, 'events'], events => events.push(payload.eventUid) )

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
        type: ADD_EVENT,
        meta: { eventUid, personUid }
    }
}

export function removePerson(uid) {
    return {
        type: REMOVE_PERSON,
        meta: {
            uid
        }
    }
}

export function removePersonSuccess(uid) {
    return {
        type: REMOVE_PERSON_SUCCESS,
        payload: {
            uid
        }
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

export function* removePersonSaga({ meta: { uid } }) {
    try{
        const ref = firebase.database().ref('people').child(uid);

        yield call([ref, ref.remove]);

        yield put( removePersonSuccess(uid) )
    } catch(e) {
        console.log('can\'t remove person because', e)
    }
}

export function* addEventToPersonSaga({ meta: { eventUid, personUid } }) {
    try{
        const ref = firebase.database().ref('people').child(`${personUid}/events`)

        yield call([ref, ref.push], eventUid )

        yield put({
            type: ADD_EVENT_SUCCESS,
            payload: {
                personUid,
                eventUid
            }
        })
    } catch(e) {
        console.log('can\'t add event to person because', e)
    }
}

export const saga = function * () {
    yield all([
        takeEvery(ADD_PERSON, addPersonSaga),
        takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
        takeEvery(REMOVE_PERSON, removePersonSaga ),
        takeEvery(ADD_EVENT, addEventToPersonSaga )
    ])
}