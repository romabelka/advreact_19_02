import React, { Component } from 'react'
import {connect} from 'react-redux'
import {selectedEventsList} from '../../ducks/events'

class SelectedEvents extends Component {
    static propTypes = {

    };

    render() {
        const items = this.props.selected.map(event => <li key={event.uid}>{event.title}</li>)
        return (
            <ul>
                {items}
            </ul>
        )
    }
}

export default connect(state => ({
    selected: selectedEventsList(state)
}))(SelectedEvents)