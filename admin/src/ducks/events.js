import {all, takeEvery, put, call, take} from 'redux-saga/effects'
import {appName} from '../config'
import {Record, OrderedSet, OrderedMap} from 'immutable'
import firebase from 'firebase'
import {createSelector} from 'reselect'
import {fbToEntities} from './utils'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const FETCH_LIMITED_REQUEST = `${prefix}/FETCH_LIMITED_REQUEST`
export const FETCH_LIMITED_START = `${prefix}/FETCH_LIMITED_START`
export const FETCH_LIMITED_SUCCESS = `${prefix}/FETCH_LIMITED_SUCCESS`

export const FETCH_COUNT_START = `${prefix}/FETCH_COUNT_START`
export const FETCH_COUNT_SUCCESS = `${prefix}/FETCH_COUNT_SUCCESS`

export const SELECT_EVENT = `${prefix}/SELECT_EVENT`

export const PageSize = 20
/**
 * Reducer
 * */
export const ReducerRecord = Record({
    loading: false,
    loaded: false,
    selected: new OrderedSet(),
    entities: new OrderedMap({}),
    eventsCount: PageSize
})

export const EventRecord = Record({
    uid: null,
    month: null,
    submissionDeadline: null,
    title: null,
    url: null,
    when: null,
    where: null
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case FETCH_LIMITED_SUCCESS:
            return state
                .set('loading', false)
                .set('loaded', true)
                .update('entities', entities => entities.merge(fbToEntities(payload, EventRecord)))

        case SELECT_EVENT:
            return state.update('selected', selected => selected.has(payload.uid)
                ? selected.remove(payload.uid)
                : selected.add(payload.uid)
            )

        case FETCH_COUNT_SUCCESS:
            return state.set('eventsCount', payload)

        default:
            return state
    }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const entitiesSelector = createSelector(stateSelector, state => state.entities)
export const selectedEventsIds = createSelector(stateSelector, state => state.selected.toArray())
export const loadingSelector = createSelector(stateSelector, state => state.loading)
export const loadedSelector = createSelector(stateSelector, state => state.loaded)
export const eventListSelector = createSelector(entitiesSelector, entities => entities.valueSeq().toArray())
export const selectedEventsList = createSelector(
    entitiesSelector, selectedEventsIds,
    (entities, ids) => ids.map(id => entities.get(id))
)
export const eventsCountSelector = createSelector(stateSelector, state => state.eventsCount)

/**
 * Action Creators
 * */
export function selectEvent(uid) {
    return {
        type: SELECT_EVENT,
        payload: {uid}
    }
}

export function fetchRows(key) {
    return {
        type: FETCH_LIMITED_REQUEST,
        payload: {key}
    }
}

/**
 * Sagas
 * */

export function* fetchLimitedSaga(action) {
    let query = firebase.database().ref('events').orderByKey().limitToFirst(PageSize);
    if(action.payload.key){
        query = query.startAt(action.payload.key)
    }

    yield put({
        type: FETCH_LIMITED_START
    })

    let snapshot = yield call([query, query.once], 'value')

    yield put({
        type: FETCH_LIMITED_SUCCESS,
        payload: snapshot.val()
    })
}

export function* fetchEventsCountSaga() {
    yield take(FETCH_LIMITED_REQUEST)
    /*
    * Unfortunately firebase does not have functionality to get COUNT()
    * https://stackoverflow.com/questions/15148803/in-firebase-is-there-a-way-to-get-the-number-of-children-of-a-node-without-load
    * */
    const ref = firebase.database().ref('events')

    yield put({
        type: FETCH_COUNT_START
    })

    const snapshot = yield call([ref, ref.once], 'value')

    yield put({
        type: FETCH_COUNT_SUCCESS,
        payload: snapshot.numChildren()
    })
}

export function* saga() {
    yield all([
        fetchEventsCountSaga(),
        takeEvery(FETCH_LIMITED_REQUEST, fetchLimitedSaga)
    ])
}