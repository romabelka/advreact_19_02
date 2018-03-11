import React, { Component } from 'react';
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'


class Bucket extends Component {
    render() {
        const {
            isHovered,
            connectDropTarget
        } = this.props

        const borderColor = isHovered ? 'green' : 'black'

        const style = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 100,
            height: 100,
            border: `2px solid ${borderColor}`,
            borderRadius: 50,
            margin: 50,
            overflow: 'auto'
        }

        return connectDropTarget(
            <div style={ style }>
                <b>BUCKET</b>
            </div>
        )
    }
}

const spec = {
    drop(props, monitor) {
        const personItem = monitor.getItem()
        //console.log('spec', 'props: ', props, 'person: ', personItem);
    }
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canReceive: monitor.canDrop(),
    isHovered: monitor.isOver(),
    dragItem: monitor.getItem()
})

export default connect(null, null)(DropTarget(
    ['person', 'event'],
    spec,
    collect
)(Bucket))