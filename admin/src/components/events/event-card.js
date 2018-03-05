import React, { Component } from 'react'

const basicStyles = {
    width: 400,
    height: 100,
    border: '1px solid black'
}

class EventCard extends Component {
    static propTypes = {

    };

    render() {
        const { event } = this.props
        return (
            <div style={basicStyles}>
                <h2>{event.title}</h2>
                <h4>{event.where}</h4>
            </div>
        )
    }
}

export default EventCard