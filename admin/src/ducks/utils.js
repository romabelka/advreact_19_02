import {OrderedMap} from 'immutable'

export function generateId() {
    return Date.now()
}

export function fbToEntities(values, DataRecord) {
    return Object.entries(values)
        .reduce(
            (acc, [uid, value]) =>
            {
                //Конвертация с преобразованием вложенных объектов в OrderedMap
                let dr
                if (typeof value === 'object')
                {
                    dr = Object.entries(value)
                        .reduce(
                            (acc, [key, val] ) => acc.set(key, typeof val === 'object' ? new OrderedMap(val) : val ),
                            new DataRecord()
                        )
                    dr = dr.set('uid', uid);
                }
                else
                    dr = new DataRecord({ uid, ...value })

                return acc.set(uid, dr);
            },
            new OrderedMap({})
        )
}

/*
export function fbToEntities(values, DataRecord) {
    return  values ? Object.entries(values)
            .reduce(
                (acc, [uid, value]) => acc.set(uid, new DataRecord({ uid, ...value })),
                new OrderedMap({})
            ) : new OrderedMap({})
}*/
