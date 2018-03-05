import React, { Component } from 'react'
import {connect} from 'react-redux'
import {selectedEventsList} from '../../ducks/events'
import EventCard from './event-card'

class SelectedEvents extends Component {
    static propTypes = {

    };

    render() {
        const items = this.props.selected.map(event => <EventCard event = {event} key = {event.uid}/>)
        return (
            <div>
                {items}
            </div>
        )
    }
}

export default connect(state => ({
    selected: selectedEventsList(state)
}))(SelectedEvents)