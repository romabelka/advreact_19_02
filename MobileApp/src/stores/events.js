import {observable, action} from 'mobx'
import firebase from 'firebase'
import BasicStore from './basic-store'

class EventsStore extends BasicStore {
    @observable eventList = {}
    @observable loading = false


    fetchAll = () => {
        action(() => this.loading = true )
        firebase.database().ref('events').once('value')
            .then(action(data => {
                this.eventList = data.val()
                this.loading = false
            }))
    }


}

export default EventsStore