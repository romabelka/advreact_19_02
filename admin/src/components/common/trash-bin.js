import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { removeEvent } from '../../ducks/events'
import { removePerson } from '../../ducks/people'

const basicStyles = {
	position: 'fixed',
	right: 0, bottom: 0,
    width: 200, height: 200,
    border: '4px dashed #eee',
}

class TrashBin extends Component {
    static propTypes = {

    };

    render() {
    	const {connectDropTarget, canReceive, isHovered} = this.props

		const dndStyles = {
			borderColor: `${canReceive
				? isHovered
					? 'green'
					: 'red'
				: '#eee'
				}`
		}

        return connectDropTarget(
            <div style = {{...basicStyles, ...dndStyles}}>
                Drop for remove!
            </div>
        )
    }
}

const spec = {
	drop(props, monitor) {
		const entityItem = monitor.getItem()
		const entityItemType = monitor.getItemType()

		if (entityItemType === 'person') {
			props.removePerson(entityItem.id)
		} else if (entityItemType === 'event') {
			props.removeEvent(entityItem.id)
		}
	},
}

const collect = (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	canReceive: monitor.canDrop(),
	isHovered: monitor.isOver()
})

export default connect(null, { removeEvent, removePerson })(DropTarget(['person', 'event'], spec, collect)(TrashBin))