import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import EventList from '../events/event-list'
import {eventList} from '../../fixtures'

class EventListScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = {
        title: 'Event List',
        headerLeft: null,
    }

    render() {
        return <EventList onEventPress = {this.onEventPress} events = {eventList}/>
    }

    onEventPress = (event) => this.props.navigation.navigate('event', { uid: event.uid })
}

const styles = StyleSheet.create({
})

export default EventListScreen
