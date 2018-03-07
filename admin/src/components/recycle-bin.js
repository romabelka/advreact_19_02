import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { selectEvent } from '../ducks/events'
import { removePerson } from '../ducks/people'

class RecycleBin extends Component {
    render() {
        const { event, connectDropTarget, isHovered } = this.props

        const dndStyles = {
            textShadow: isHovered ? '0px 0px 60px red' : '',
        }
        return connectDropTarget(<div style={{ fontSize: 60, ...dndStyles }}>🗑</div>)

    }
}


const spec = {
    drop(props, monitor) {
        const item = monitor.getItem()
        const type = monitor.getItemType()
        switch (type) {
            case 'event':
                props.selectEvent(item.id)
                break
            case 'person':
                props.removePerson(item.id)
                break
        }
    },
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isHovered: monitor.isOver(),
})

export default connect(null, { selectEvent, removePerson })(
    DropTarget(['person', 'event'], spec, collect)(
        RecycleBin))
