import {observable, action, computed} from 'mobx'
import firebase from 'firebase'
import BasicStore from './basic-store'
import {mapToArray} from "../utils/fb-helpers";

class EventsStore extends BasicStore {
    @observable eventsList = {}
    @observable isLoaded = false
    @observable loading = false
    @observable selectedEventUid = ''

    @computed get eventsMapped() {
        return mapToArray(this.eventsList)
    }

    @computed get selectedEvent() {
        return this.eventsList[this.selectedEventUid]
    }

    @action loadEventsSuccess = events => {
        this.eventsList = events
        this.loading = false
        this.isLoaded = true
    }

    @action loadPeopleRequest = () => {
        this.isLoaded = false
        this.loading = true
    }

    @action selectEvent = uid => this.selectedEventUid = uid

    getEvents = () => {
        this.loadPeopleRequest()
        firebase.database().ref('events').once('value')
            .then(snapshot => {
                this.loadEventsSuccess(snapshot.val())
            })
    }
}

export default EventsStore