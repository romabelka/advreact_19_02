import {all, take, takeEvery, select, put, call} from 'redux-saga/effects'
import {appName} from '../config'
import {Record, Set} from 'immutable'
import firebase from 'firebase'
import {createSelector} from 'reselect'
import {fbToEntities} from './utils'

/**
 * Constants
 * */
export const moduleName = 'recyclebin'
const prefix = `${appName}/${moduleName}`

export const ADD_PERSON  = `${prefix}/ADD_PERSON`
export const ADD_EVENT = `${prefix}/ADD_EVENT`

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
