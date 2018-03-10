import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { deletePerson } from '../../ducks/people'
import { deleteEvent } from '../../ducks/events'

class TrashBin extends Component {
	static propTypes = {

	};

	render() {
		const { connectDropTarget, isOver, canDrop } = this.props

		return connectDropTarget(
			<div style={{ position: "fixed", top: 0, right: 0, width: 100, height: 100, textAlign: "center", lineHeight: "100px", border: "1px solid " + (canDrop ? (isOver ? "green" : "red") : "black"), zIndex: 10, backgroundColor: "white" }}>
				Delete
			</div>
		)
	}
}

const droppableTrashBin = DropTarget(
	['person', 'event'],
	{
		drop(props, monitor) {
			const type = monitor.getItemType()

			if (type === 'person') {
				props.deletePerson( monitor.getItem().id )
			} else if (type === 'event') {
				props.deleteEvent( monitor.getItem().id )
			}
		}
	},
	(connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	})
)(TrashBin)

export default connect(null, { deletePerson, deleteEvent })(droppableTrashBin)