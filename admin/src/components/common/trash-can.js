import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { movePersonToTrash } from '../../ducks/people'

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
    const personItem = monitor.getItem()
    console.log('---', 'person: ', personItem.id)
    props.movePersonToTrash(personItem.id)
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canReceive: monitor.canDrop(),
  isHovered: monitor.isOver()
})

const mapDispatchToProps = {
  movePersonToTrash
};

export default connect(null, mapDispatchToProps)(
  DropTarget(['person'], spec, collect)(TrashCan)
)
