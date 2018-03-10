import React, {Component} from 'react'
import {defaultTableRowRenderer as DefaultRenderer} from 'react-virtualized'
import 'react-virtualized/styles.css'
import {DragSource} from 'react-dnd'
import {getEmptyImage} from 'react-dnd-html5-backend'
import DragPreview from './event-drag-preview'

class EventLazyTableRow extends Component {
	componentDidMount() {
		this.props.connectPreview(getEmptyImage())
	}

	render() {
		const {connectDragSource, isDragging, rowParams} = this.props

		const dndStyles = {
			opacity: isDragging ? 0.2 : 1
		}

		return connectDragSource(
			<div style={dndStyles}>
				{ DefaultRenderer(rowParams) }
			</div>
		)
	}
}


export default DragSource(
	'event',
	{
		beginDrag(props) {
			return {
				id: props.event.uid,
				DragPreview
			}
		}
	},
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		connectPreview: connect.dragPreview(),
		isDragging: monitor.isDragging(),
	})
)(EventLazyTableRow)