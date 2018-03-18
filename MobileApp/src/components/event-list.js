import React, { Component } from 'react'
import {View, Text, ScrollView, StyleSheet} from 'react-native'
import Card from './common/card'
import EventScreen from './event-screen'

class EventList extends Component {
    static propTypes = {

    };

    render() {
        return (
            <ScrollView>
                {this.props.events.map(event =>
                    <Card key = {event.uid}>
	                    <EventScreen event={event} />
                    </Card>
                )}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
})

export default EventList