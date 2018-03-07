import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { removePerson } from '../../ducks/people'
import { removeEvent } from '../../ducks/events'
import RecycleBin from "./recycle-bin";

class RecycleBinDropTarget extends Component {

    render() {
        const { connectDropTarget, canReceive, isHovered, dragItem } = this.props

        if(!dragItem || !canReceive){
            return null;
        }
        return connectDropTarget(
            <div>
                <RecycleBin isRed={isHovered && canReceive}/>
            </div>
        )
    }
}

const spec = {
    drop(props, monitor) {
        const item = monitor.getItem()
        const type = monitor.getItemType()

        console.log('---item dropped', item)
        console.log('---item type', type)
        if(type === 'person'){
            props.removePerson(item.id)
        }
        else if(type === 'event'){
            props.removeEvent(item.id)
        }
    }
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canReceive: monitor.canDrop(),
    isHovered: monitor.isOver(),
    dragItem: monitor.getItem()
})

export default connect(null, { removePerson, removeEvent })(DropTarget(['person', 'event'], spec, collect)(RecycleBinDropTarget))