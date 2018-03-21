import React, { Component } from 'react'
import {StyleSheet, Text} from 'react-native'
import { inject, observer } from 'mobx-react'
import EventList from '../events/event-list'

@inject('events') @observer
class EventListScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = {
        title: 'Event List',
    }

    componentDidMount() {
        this.props.events.loadEvents()
    }

    render() {
        const { loading, events } = this.props.events
        return loading ? <Text>Loading...</Text> : <EventList onEventPress={this.onEventPress} events={events}/>
    }

    onEventPress = (event) => this.props.navigation.navigate('event', { uid: event.uid })
}

const styles = StyleSheet.create({
})

export default EventListScreen
