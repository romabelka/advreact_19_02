import React, { Component } from 'react'
import { DropTarget, DragSource } from 'react-dnd'
import { connect } from 'react-redux'
import { addEventToPerson } from '../../ducks/people'
import EventCardPreview from './event-card-preview'
import {getEmptyImage} from 'react-dnd-html5-backend'

const basicStyles = {
    width: 400,
    height: 100,
}

class EventCard extends Component {

    componentDidMount() {
        this.props.connectPreview(getEmptyImage())
    }

    render() {
        const { event, connectDropTarget, connectDragSource, canReceive, isHovered, isDragging } = this.props

        const dndStyles = {
            border: `1px solid ${canReceive 
                ? isHovered 
                    ? 'green'
                    : 'red'
                : 'black'
            }`,
            opacity: isDragging ? 0.2 : 1
        }


        return connectDragSource(connectDropTarget(
            <div style={{...basicStyles, ...dndStyles}}>
                <h2>{event.title}</h2>
                <h4>{event.where}</h4>
            </div>
        ))
    }
}

const specTarget = {
    drop(props, monitor) {
        const personItem = monitor.getItem()
/*
        console.log('---', 'event: ', props.event.uid, 'person: ', personItem.id)
*/
        props.addEventToPerson(props.event.uid, personItem.id)
    },
}

const collectTarget = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canReceive: monitor.canDrop(),
    isHovered: monitor.isOver()
})


const specSource = {
    beginDrag(props) {
        return {
            id: props.event.uid,
            DragPreview: EventCardPreview
        }
    }
}

const collectSource = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
})

export default connect(null, { addEventToPerson })(DragSource('event', specSource, collectSource)(DropTarget(['person'], specTarget, collectTarget)(EventCard)))