import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { addEventToPerson } from '../../ducks/people'

const basicStyles = {
    width: 400,
    height: 100,
}

class EventCard extends Component {
    static propTypes = {

    };

    render() {
        const { event, connectDropTarget, canReceive, isHovered } = this.props

        const dndStyles = {
            border: `1px solid ${canReceive 
                ? isHovered 
                    ? 'green'
                    : 'red'
                : 'black'
            }`
        }

        return connectDropTarget(
            <div style={{...basicStyles, ...dndStyles}}>
                <h2>{event.title}</h2>
                <h4>{event.where}</h4>
            </div>
        )
    }
}

const spec = {
    drop(props, monitor) {
        const personItem = monitor.getItem()
/*
        console.log('---', 'event: ', props.event.uid, 'person: ', personItem.id)
*/
        props.addEventToPerson(props.event.uid, personItem.id)
    },
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canReceive: monitor.canDrop(),
    isHovered: monitor.isOver()
})

export default connect(null, { addEventToPerson })(DropTarget(['person'], spec, collect)(EventCard))