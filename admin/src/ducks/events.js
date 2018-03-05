import {all, takeEvery, put, call, take, select} from 'redux-saga/effects'
import {appName} from '../config'
import {Record, OrderedMap, OrderedSet} from 'immutable'
import firebase from 'firebase'
import {createSelector} from 'reselect'
import {fbToEntities} from './utils'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const FETCH_NEXT_REQUEST = `${prefix}/FETCH_NEXT_REQUEST`
export const FETCH_NEXT_START = `${prefix}/FETCH_NEXT_START`
export const FETCH_NEXT_SUCCESS = `${prefix}/FETCH_NEXT_SUCCESS`

export const SELECT_EVENT = `${prefix}/SELECT_EVENT`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    loading: false,
    loaded: false,
    selected: new OrderedSet(),
    entities: new OrderedMap([])
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
        case FETCH_ALL_START:
        case FETCH_NEXT_START:
            return state.set('loading', true)

        case FETCH_ALL_SUCCESS:
            return state
                .set('loading', false)
                .set('loaded', true)
                .set('entities', fbToEntities(payload, EventRecord))

        case  FETCH_NEXT_SUCCESS:
             return  state
                 .set('loading', false)
                 .update('entities', entities => entities.merge(fbToEntities(payload, EventRecord)))


        case SELECT_EVENT:
            return state.update('selected', selected => selected.has(payload.uid)
                ? selected.remove(payload.uid)
                : selected.add(payload.uid)
            )

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
export const selectedEventsList = createSelector(entitiesSelector, selectedEventsIds,
    (entities, ids) => ids.map(id => entities.get(id))
)

/**
 * Action Creators
 * */

export function fetchAllEvents() {
    return {
        type: FETCH_ALL_REQUEST
    }
}

export function fetchNextEvents(countToFetch) {
    return {
        type: FETCH_NEXT_REQUEST,
        payload: {countToFetch}
    }
}

export function selectEvent(uid) {
    return {
        type: SELECT_EVENT,
        payload: { uid }
    }
}



/**
 * Sagas
 * */

export function* fetchNextSaga() {
    console.log('Start ref...')
    const ref = firebase.database().ref('events')
    console.log('Done ref...')

    yield put({
        type: FETCH_NEXT_START
    })

    const action = yield take(FETCH_NEXT_REQUEST)
    const countToFetch = action.payload.countToFetch || 10;

    const events =  yield select(entitiesSelector)

    const id = (events && events.size) ? events.last().get('uid') : ''


    let query = ref.orderByKey().limitToFirst(countToFetch).startAt(id)

    const snapshot = yield call([query, query.once], 'value')

    yield put({
        type: FETCH_NEXT_SUCCESS,
        payload: snapshot.val()
    })
}

export function* fetchAllSaga() {
    const ref = firebase.database().ref('events')

    yield put({
        type: FETCH_ALL_START
    })

    const snapshot = yield call([ref, ref.once], 'value')

    yield put({
        type: FETCH_ALL_SUCCESS,
        payload: snapshot.val()
    })
}

export function * saga() {
    yield all([
        takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
        takeEvery(FETCH_NEXT_REQUEST, fetchNextSaga)
    ])
}