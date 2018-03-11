import React, { Component } from 'react'
import { defaultTableRowRenderer } from 'react-virtualized'
import { DragSource } from 'react-dnd'

class DraggableTableRow extends Component{
    render() {
        const {
            connectDragSource
        } = this.props

        return connectDragSource(
            defaultTableRowRenderer(this.props)
        )
    }
}

const spec = {
    beginDrag(props) {
        return {
            id: props.rowData.uid
        }
    }
}

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource()
})


export default DragSource(
    'event',
    spec,
    collect
)(DraggableTableRow)



