import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { addEventToPerson, peopleListSelector } from '../../ducks/people'

const basicStyles = {
    width: 500,
    height: 150,
}

class EventCard extends Component {
    static propTypes = {

    };

    render() {
        const { event, people, connectDropTarget, canReceive, isHovered } = this.props
        const peopleList = people.map(person => person.email).join(', ')

        const dndStyles = {
            border: `1px solid ${canReceive 
                ? isHovered 
                    ? 'green'
                    : 'red'
                : 'black'
            }`
        }

        return connectDropTarget(
            <div style={{...basicStyles, ...dndStyles}}>
                <h2>{event.title}</h2>
                <h4>{event.where}</h4>
                <h3>{peopleList}</h3>
            </div>
        )
    }
}

const spec = {
    drop(props, monitor) {
        const personItem = monitor.getItem()
/*
        console.log('---', 'event: ', props.event.uid, 'person: ', personItem.id)
*/
        props.addEventToPerson(props.event.uid, personItem.id)
    },
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canReceive: monitor.canDrop(),
    isHovered: monitor.isOver()
})

export default connect((state, props) => {
//    const people = peopleListSelector(state)
//    debugger
    return {
        people: peopleListSelector(state).filter(person => person.events.includes(props.event.uid))
    }
}, { addEventToPerson })(DropTarget(['person'], spec, collect)(EventCard))