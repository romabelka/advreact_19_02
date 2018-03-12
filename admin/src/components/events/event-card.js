import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import DragPreview from './event-drag-preview'
import { addEventToPerson } from '../../ducks/people'

const basicStyles = {
    width: 400,
    height: 100,
}

class EventCard extends Component {
    componentDidMount() {
        this.props.connectPreview(getEmptyImage())
    }

    render() {
        const { event, connectDropTarget, canReceive, isHovered, connectDragSource, isDragging } = this.props

        const dndStyles = {
            border: `1px solid ${canReceive
                ? isHovered
                    ? 'green'
                    : 'red'
                : 'black'
                }`,
            opacity: isDragging ? 0.2 : 1
        }
        return connectDropTarget(
            <div style={{ ...basicStyles, ...dndStyles }}>
                {connectDragSource(<h2>{event.title}</h2>)}
                <h4>{event.where}</h4>
            </div>
        )
    }
}

const specDrop = {
    drop(props, monitor) {
        const personItem = monitor.getItem()
        /*
                console.log('---', 'event: ', props.event.uid, 'person: ', personItem.id)
        */
        props.addEventToPerson(props.event.uid, personItem.id)
    },
}

const collectDrop = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canReceive: monitor.canDrop(),
    isHovered: monitor.isOver()
})

const specDrag = {
    beginDrag(props) {
        return {
            id: props.event.uid,
            DragPreview
        }
    }
}

const collectDrag = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
})


export default connect(null, { addEventToPerson })(
    DropTarget('person', specDrop, collectDrop)(
        DragSource('event', specDrag, collectDrag)(EventCard)
    )
)