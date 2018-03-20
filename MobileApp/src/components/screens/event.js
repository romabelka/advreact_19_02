import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import Event from '../events/event'
import {eventList} from '../../fixtures'

class EventScreen extends Component {
    static propTypes = {

    };

    render() {
        return <Event event = {eventList[0]} />

    }
}

const styles = StyleSheet.create({
})

export default EventScreen