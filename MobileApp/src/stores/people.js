import { observable, action } from 'mobx'
import firebase from 'firebase'
import BasicStore from './basic-store'

class PeopleStore extends BasicStore {
    @observable people = {}
    @observable loading = false

    loadPeople = (action(() => {
        this.loading = true
        firebase.database().ref('people').once('value')
            .then(action(data => {
                this.people = data.val()
                this.loading = false
            }))
    }))


}

export default PeopleStore
