import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import EventList from '../events/event-list'
import {observer, inject} from 'mobx-react'
import Loading from '../common/loading';

@inject('events') @observer
class EventListScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = {
        title: 'Event List'
    }

    componentDidMount(){
        this.props.events.getEvents()
    }

    render() {
        const eventsStore = this.props.events
        if(eventsStore.loading){
            return <Loading />
        }

        return <EventList onEventPress = {this.onEventPress} events = {eventsStore.eventsMapped}/>
    }

    onEventPress = (event) => {
        this.props.events.selectEvent(event.uid)
        //todo: move to store
        this.props.navigation.navigate('event', { uid: event.uid })
    }
}

const styles = StyleSheet.create({
})

export default EventListScreen