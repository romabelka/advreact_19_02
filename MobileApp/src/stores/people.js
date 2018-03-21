import {observable, action, computed} from 'mobx'
import firebase from 'firebase'
import BasicStore from './basic-store'
import {mapToArray} from "../utils/fb-helpers";

class PeopleStore extends BasicStore {
    @observable peopleList = {}
    @observable isLoaded = false
    @observable loading = false

    @computed get peopleMapped() {
        return mapToArray(this.peopleList)
    }

    @action loadPeople = people => {
        this.peopleList = people
        this.loading = false
        this.isLoaded = true
    }
    @action loadPeopleRequest = () => {
        this.isLoaded = false
        this.loading = true
    }

    getPeople = () => {
        this.loadPeopleRequest()
        firebase.database().ref('people').once('value')
            .then(snapshot => {
                this.loadPeople(snapshot.val())
            })
    }
}

export default PeopleStore