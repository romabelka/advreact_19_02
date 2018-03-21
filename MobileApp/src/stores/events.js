import { observable, action } from 'mobx'
import firebase from 'firebase'
import BasicStore from './basic-store'

class EventsStore extends BasicStore {
    @observable events = {}
    @observable loading = false

    loadEvents = (action(() => {
        this.loading = true
        firebase.database().ref('events').once('value')
            .then(action(data => {
                this.events = data.val()
                this.loading = false
            }))
    }))


}

export default EventsStore
