import {appName} from '../config'
import {all, take, takeEvery, put, call, apply} from 'redux-saga/effects'
import {Record} from 'immutable'
import firebase from 'firebase'
import {push} from 'react-router-redux'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_START = `${prefix}/SIGN_IN_START`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`

export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`
export const SIGN_UP_START = `${prefix}/SIGN_UP_START`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    user: null
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case SIGN_UP_SUCCESS:
        case SIGN_IN_SUCCESS:
            return state.set('user', payload)
        default:
            return state
    }
}

/**
 * Selectors
 * */
export const userSelector = state => state[moduleName].user

/**
 * Action Creators
 * */

export function signIn(email, password) {
    return {
        type: SIGN_IN_REQUEST,
        payload: { email, password }
    }
}

export function signUp(email, password) {
    return {
        type: SIGN_UP_REQUEST,
        payload: { email, password }
    }
}

firebase.auth().onAuthStateChanged(user => {
    if (user) window.store.dispatch({
        type: SIGN_IN_SUCCESS,
        payload: user
    })
})

/**
 * Sagas
 **/

export const signInSaga = function * () {
    while (true) {
        const {payload} = yield take(SIGN_IN_REQUEST)

        yield put({
            type: SIGN_IN_START,
            payload
        })

        const auth = firebase.auth()

        try {
            const user = yield call([auth, auth.signInWithEmailAndPassword], payload.email, payload.password)

            yield put({
                type: SIGN_IN_SUCCESS,
                payload: user
            })
            yield put(push(`/people`))

        } catch (error) {
            yield put({
                type: SIGN_IN_ERROR,
                error
            })
        }
    }
}

export const signUpSaga = function * ({ payload }) {
    yield put({
        type: SIGN_UP_START,
        payload
    })

    const auth = firebase.auth()

    try {
        const user = yield apply(auth, auth.createUserWithEmailAndPassword, [payload.email, payload.password])

        yield put({
            type: SIGN_UP_SUCCESS,
            payload: user
        })
    } catch (error) {
        yield put({
            type: SIGN_UP_ERROR,
            error
        })
    }
}

export const saga = function * () {
    yield all([
        signInSaga(),
        takeEvery(SIGN_UP_REQUEST, signUpSaga)
    ])
}