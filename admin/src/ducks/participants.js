import {appName} from '../config'
import {Record} from 'immutable'

export const moduleName = 'participants'
const prefix = `${appName}/${moduleName}`

export const PARTICIPANT_CREATE_START = `${prefix}/PARTICIPANT_CREATE_START`
export const PARTICIPANT_CREATE_SUCCESS = `${prefix}/PARTICIPANT_CREATE_SUCCESS`

export const ReducerRecord = Record({
    participants: []
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action
    console.log(type, payload)
    switch (type) {
        case PARTICIPANT_CREATE_START:
        case PARTICIPANT_CREATE_SUCCESS:
            return state.set('participants', payload)
        default:
            return state
    }
}

export const participantsSelector = state => state[moduleName].participants

export function create(name, lastName, email) {
    return (dispatch, getState) => {
        const state = getState().participants
        const { participants } = state
        console.log(participants)

        dispatch({
            type: PARTICIPANT_CREATE_START,
            payload: { name, lastName, email }
        })

        participants.push({ name, lastName, email })
        dispatch({
            type: PARTICIPANT_CREATE_SUCCESS,
            payload: participants
        })
    }
}
