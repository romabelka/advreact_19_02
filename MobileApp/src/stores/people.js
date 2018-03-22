import {observable, action} from 'mobx'
import firebase from 'firebase'
import BasicStore from './basic-store'

class PeopleStore extends BasicStore {
    @observable peopleList = {}
    @observable loading = false


    fetchAll = () => {
        action(() => this.loading = true )
        firebase.database().ref('people').once('value')
            .then(action(data => {
                this.peopleList = data.val()
                this.loading = false
            }))
    }


}

export default PeopleStore