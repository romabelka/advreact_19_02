import {put, call, take, apply} from 'redux-saga/effects'
import {push} from 'react-router-redux'
import firebase from 'firebase'
import {
  signInSaga,
  signUpSaga,
  SIGN_IN_REQUEST,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_UP_REQUEST,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR
} from './auth'

describe('Auth duck', () => {

  describe('signInSaga', () => {
    it('should sign in and redirect', () => {
      const payload = { email: 'qwfp@test.com', password: 'qwfp' }
      const action = {
        type: SIGN_IN_REQUEST,
        payload
      }
      const sagaGen = signInSaga(action)
  
      expect(sagaGen.next().value).toEqual(take(SIGN_IN_REQUEST))
  
      expect(sagaGen.next(action).value).toEqual(put({
        type: SIGN_IN_START,
        payload
      }))
  
      const auth = firebase.auth()
      expect(sagaGen.next().value).toEqual(call(
          [auth, auth.signInWithEmailAndPassword],
          payload.email,
          payload.password
      ))
  
      const user = { userName: 'qwfp' }
      expect(sagaGen.next(user).value).toEqual(put({
          type: SIGN_IN_SUCCESS,
          payload: user
      }))
  
      expect(sagaGen.next().value).toEqual(put(push('/people')))
  
      expect(sagaGen.next().done).toEqual(false)
    })
  
    it('should generate error action if auth raise error', () => {
      const payload = { email: 'qwfp@test.com', password: 'qwfp' }
      const action = {
        type: SIGN_IN_REQUEST,
        payload
      }
      const sagaGen = signInSaga(action)

      sagaGen.next()
      sagaGen.next(action)
      sagaGen.next()

      var error = new Error()
      expect(sagaGen.throw(error).value).toEqual(put({
        type: SIGN_IN_ERROR,
        error
      }))

      expect(sagaGen.next().done).toEqual(false)
    })
  })

  describe('signUpSaga', () => {
    it('should sign up', () => {
      const payload = { email: 'qwfp@test.com', password: 'qwfp' }
      const action = {
        type: SIGN_UP_REQUEST,
        payload
      }
      const sagaGen = signUpSaga(action)
  
      expect(sagaGen.next(action).value).toEqual(put({
        type: SIGN_UP_START,
        payload
      }))
      
  
      const auth = firebase.auth()
      expect(sagaGen.next().value).toEqual(apply(
        auth,
        auth.createUserWithEmailAndPassword,
        ['qwfp@test.com', 'qwfp']
    ))
  
      const user = { userName: 'qwfp' }
      expect(sagaGen.next(user).value).toEqual(put({
          type: SIGN_UP_SUCCESS,
          payload: user
      }))
  
      expect(sagaGen.next().done).toEqual(true)
    })
  
    it('should generate error action if auth raise error', () => {
      const payload = { email: 'qwfp@test.com', password: 'qwfp' }
      const action = {
        type: SIGN_UP_REQUEST,
        payload
      }
      const sagaGen = signUpSaga(action)

      sagaGen.next()
      sagaGen.next(action)
      sagaGen.next()

      var error = new Error()
      expect(sagaGen.throw(error).value).toEqual(put({
        type: SIGN_UP_ERROR,
        error
      }))

      expect(sagaGen.next().done).toEqual(true)
    })
  })

})