import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { movePersonToTrash } from '../../ducks/people'
import { moveEventToTrash } from '../../ducks/events'

const basicStyles = {
  width: 200,
  height: 200,
  backgroundColor: `#eee`
}

class TrashCan extends Component {
  render() {
    const { connectDropTarget, canReceive, isHovered } = this.props

    const dndStyles = {
      border: `1px solid ${
        canReceive ? (isHovered ? 'green' : 'red') : 'black'
      }`
    }

    return connectDropTarget(
      <div>
        <h1>Trash</h1>
        <div style={{...basicStyles, ...dndStyles}}>Drop person or event here</div>
      </div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    const id = monitor.getItem().id;
    const type = monitor.getItemType()

    switch (type) {
      case `person`:
        props.movePersonToTrash(id)
        break
      case `event`:
        props.moveEventToTrash(id)
        break
      default:
    }
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canReceive: monitor.canDrop(),
  isHovered: monitor.isOver()
})

const mapDispatchToProps = {
  movePersonToTrash,
  moveEventToTrash
};

export default connect(null, mapDispatchToProps)(
  DropTarget(['person', 'event'], spec, collect)(TrashCan)
)
