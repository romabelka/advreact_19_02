export function mapToArray(fbObjectVal) {
    return Object.keys(fbObjectVal)
        .map(uid => ({
            uid: uid,
            ...fbObjectVal[uid]
        }))
}