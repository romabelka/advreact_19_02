export default store => next => action => {

    if (!action.createdId){
        return next(action)
    }

    next({
        ...action,
        createdId: parseInt((Math.random()*10000)).toString()
    })
}