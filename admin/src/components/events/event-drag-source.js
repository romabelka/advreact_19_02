import { Component } from 'react'
import {DragSource} from 'react-dnd'
import {getEmptyImage} from 'react-dnd-html5-backend'
import DragPreview from './event-drag-preview'
import {defaultTableRowRenderer} from 'react-virtualized'

class EventDragSource extends Component {

    componentDidMount() {
        this.props.connectPreview(getEmptyImage())
    }

    render() {
        return this.props.connectDragSource(defaultTableRowRenderer(this.props))
    }
}

const spec = {
    beginDrag(props) {
        return {
            id: props.rowData.uid,
            DragPreview
        }
    }
}

const collect = (connect) => ({
    connectDragSource: connect.dragSource(),
    connectPreview: connect.dragPreview(),
})

export default DragSource('event', spec, collect)(EventDragSource)