import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import Event from '../events/event'
import {observer, inject} from 'mobx-react'

@inject('events') @observer
class EventScreen extends Component {
    static propTypes = {

    };

    render() {
        return <Event event = {this.props.events.selectedEvent} />

    }
}

const styles = StyleSheet.create({
})

export default EventScreen