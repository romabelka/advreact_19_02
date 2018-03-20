import {observable, action} from 'mobx'
import firebase from 'firebase'
import BasicStore from './basic-store'

class AuthStore extends BasicStore {
    @observable people = []
    @observable isLoaded = false
    @observable loading = false

    @action loadPeople = people => {
        this.people = people
        this.loading = false
        this.isLoaded = true
    }
    @action loadPeopleRequest = () => {
        this.isLoaded = false
        this.loading = true
    }

    signIn = () => {
        /*firebase.??
            .then(data => {
                ??
            }))*/
    }
}

export default AuthStore