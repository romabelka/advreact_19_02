import React, { Component } from 'react'
import { connect } from 'react-redux'
import {DragSource, DropTarget} from 'react-dnd'
import {getEmptyImage} from 'react-dnd-html5-backend'
import DragPreview from './person-drag-preview'
import { addEventToPerson } from '../../ducks/people'

class PersonCard extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.connectPreview(getEmptyImage())
    }

    render() {
        const {
            person,
            connectDragSource, isDragging,
            connectDropTarget, isHovered
        } = this.props

        const dndStyles = {
            opacity: isDragging ? 0.2 : 1,
            border: isHovered ? '1px solid green' : 'none'
        }
        return connectDropTarget(
            <div style = {dndStyles}>
                {connectDragSource(<h1>{person.firstName} <b>{person.lastName}</b></h1>)}
                <h3>{person.email}</h3>
            </div>
        )
    }
}

const specSource = {
    beginDrag(props) {
        return {
            id: props.person.uid,
            DragPreview
        }
    }
}

const specTarget = {
    drop(props, monitor) {
        const event = monitor.getItem()
        props.addEventToPerson(event.uid, props.person.uid)
    }
}

const collectSource = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
})

const collectTarget = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isHovered: monitor.isOver()
})

export default connect(null, { addEventToPerson })(
    DropTarget(['event'], specTarget, collectTarget )(
    DragSource('person', specSource, collectSource)(PersonCard)
))