export function fbToEntities(values) {
    return Object.entries(values)
        .reduce(
            (acc, [uid, value]) => acc[uid] = { uid, ...value },
            {}
        )
}