import { call, apply, put, take } from 'redux-saga/effects'
import {reset} from 'redux-form'
import {
    SIGN_IN_START,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_UP_START,
    SIGN_UP_SUCCESS,
    signInSaga,
    signUpSaga,
} from './auth'

describe('auth duck', () => {
    const payload = {email: 'qwe@qwe.ru', password: 'qwerty'}

    it('should sign up', () => {
        const actionUp = {
            type: SIGN_UP_START,
            payload: payload
        }

        const sagaGenUp = signUpSaga(actionUp)

        expect(sagaGenUp.next().value).toEqual(put(actionUp))
    })

    it('should sign in', () => {
        const actionIn = {
            type: SIGN_IN_START,
            payload: payload
        }

        const sagaGenIn = signInSaga()

        expect(sagaGenIn.next().value).toEqual(take(SIGN_IN_REQUEST))
        expect(sagaGenIn.next(actionIn).value).toEqual(put(actionIn))
    })

})