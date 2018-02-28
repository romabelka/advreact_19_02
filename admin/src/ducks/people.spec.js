import {put, call} from 'redux-saga/effects'
import {reset} from 'redux-form'
import {ADD_PERSON_REQUEST, ADD_PERSON_SUCCESS, addPersonSaga} from './people'
import {generateId} from './utils'

describe('People duck', () => {
    it('should add a person', () => {
        const person = { firstName: 'roma', lastName: 'Iakobchuk', email: 'test@example.com'}

        const action = {
            type: ADD_PERSON_REQUEST,
            payload: person
        }
        const sagaGen = addPersonSaga(action)

        expect(sagaGen.next().value).toEqual(call(generateId))

        const id = generateId()

        expect(sagaGen.next(id).value).toEqual(put({
            type: ADD_PERSON_SUCCESS,
            payload: {id, ...person}
        }))

        expect(sagaGen.next().value).toEqual(put(reset('person')))

        expect(sagaGen.next().done).toEqual(true)
    });
});