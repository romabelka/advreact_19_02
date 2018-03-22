import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import EventList from '../events/event-list'
import Loader from '../common/loader'
import {inject, observer} from 'mobx-react'


@inject('events') @observer
class EventListScreen extends Component {
    static propTypes = {

    };

    componentDidMount()
    {
        this.props.events.fetchAll()
    }

    static navigationOptions = {
        title: 'Event List'
    }

    render() {
       //console.log('--', this.props.events)
        const {loading, eventList} = this.props.events
        console.log('----', loading);
        return loading ? <Loader /> :  <EventList onEventPress = {this.onEventPress} events = {eventList}/>
    }

    onEventPress = (event) => this.props.navigation.navigate('event', { uid: event.uid })
}

const styles = StyleSheet.create({
})

export default EventListScreen