import {OrderedMap} from 'immutable'

export function generateId() {
    return Date.now()
}

export function fbToEntities(values, DataRecord) {
    return  values ? Object.entries(values)
        .reduce(
            (acc, [uid, value]) => acc.set(uid, new DataRecord({ uid, ...value })),
            new OrderedMap({})
        ) : new OrderedMap({})
}