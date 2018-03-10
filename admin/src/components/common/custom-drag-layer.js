import React, { Component } from 'react'
import {DragLayer} from 'react-dnd'

const basicStyles = {
    position: 'fixed',
    top: 0, bottom: 0,
    left: 0, right: 0,
    pointerEvents: 'none',
    zIndex: 100
}

class CustomDragLayer extends Component {
    static propTypes = {

    };

    getDragItem() {
        const { isDragging, offset, itemData } = this.props
        if (!isDragging || !offset || !itemData || !itemData.DragPreview) return null

        const transform = `translate(${offset.x}px,${offset.y}px)`

        return (
            <div style = {{ transform }}>
                <itemData.DragPreview {...itemData}/>
            </div>
        )
    }

    render() {
        const item = this.getDragItem()
        if (!item) return null

        return (
            <div style = {basicStyles}>
                {item}
            </div>
        )
    }
}

const collect = (monitor) => ({
    isDragging: monitor.isDragging(),
    offset: monitor.getSourceClientOffset(),
    itemData: monitor.getItem()
})

export default DragLayer(collect)(CustomDragLayer)