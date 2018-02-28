import {
  signUpSaga,
  signInSaga,
  SIGN_IN_REQUEST,
  SIGN_UP_START,
  SIGN_IN_START,
  SIGN_UP_SUCCESS,
  SIGN_IN_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN_ERROR
} from './auth'
import { call, apply, put, take } from 'redux-saga/effects'
import firebase from 'firebase'

describe('Авторизация', () => {
  const credentials = { email: `aa@bb.cc`, password: `qwertyuiop` }
  const auth = firebase.auth()

  describe('Регистрация', () => {
    const actionStart = {
      type: SIGN_UP_START,
      payload: credentials
    }
    const saga = signUpSaga(actionStart)

    it(`1. Эффект put c экшеном SIGN_UP_START`, () => {
      expect(saga.next().value).toEqual(put(actionStart))
    })
    it(`2. Эффект apply c createUserWith…`, () => {
      expect(saga.next().value).toEqual(
        apply(auth, auth.createUserWithEmailAndPassword, [
          credentials.email,
          credentials.password
        ])
      )
    })
    it(`3. Эффект put c экшеном SIGN_UP_SUCCESS`, () => {
      expect(saga.next().value['PUT'].action.type).toEqual(SIGN_UP_SUCCESS)
    })
    it(`4. Сага регистрации отработала`, () => {
      expect(saga.next().done).toEqual(true)
    })
    it(`5. Эффект put c экшеном SIGN_UP_ERROR`, () => {
      const error = new Error('test error')
      const saga = signUpSaga(actionStart)
      saga.next()
      saga.next()
      expect(saga.throw(error).value).toEqual(
        put({
          type: SIGN_UP_ERROR,
          error
        })
      )
    })
  })
  describe('Авторизация', () => {
    const saga = signInSaga()
    const action = {
      type: SIGN_IN_START,
      payload: credentials
    }
    it('1. Эфект take с ожиданием SIGN_IN_REQUEST', () => {
      expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST))
    })
    it(`2. Эффект put c экшеном SIGN_IN_START`, () => {
      expect(saga.next(action).value).toEqual(put(action))
    })
    it(`3. Эффект call c signInWithEmailAndPassword`, () => {
      expect(saga.next().value).toEqual(
        call(
          [auth, auth.signInWithEmailAndPassword],
          credentials.email,
          credentials.password
        )
      )
    })
    it(`4. Эффект put c экшеном SIGN_IN_SUCCESS`, () => {
      expect(saga.next().value['PUT'].action.type).toEqual(SIGN_IN_SUCCESS)
    })
    it(`5. Эффект put c экшеном push('/people')`, () => {
      expect(saga.next().value['PUT'].action.type).toEqual(`@@router/CALL_HISTORY_METHOD`)
    })
    it('6. Сага авторизации отработала и вернулась к ожиданию экшена SIGN_IN_REQUEST', () => {
      const iterator = saga.next()
      expect(iterator.done).toEqual(false)
      expect(iterator.value).toEqual(take(SIGN_IN_REQUEST))
    })
    it(`7. Эффект put c экшеном SIGN_IN_ERROR`, () => {
      const error = new Error('test error')
      const saga = signInSaga()
      saga.next()
      saga.next(action)
      saga.next()
      expect(saga.throw(error).value).toEqual(
        put({
          type: SIGN_IN_ERROR,
          error
        })
      )
    })
  })
})
