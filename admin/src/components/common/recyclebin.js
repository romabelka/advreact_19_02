import React, { Component } from 'react'
import { DropTarget} from 'react-dnd'
import { connect } from 'react-redux'
import {eventToBin, personToBin, emptyBin,
        peopleListSelector as peopleInBinSelector,
        eventListSelector as eventsInBinSelector} from '../../ducks/recyclebin'
import {peopleListSelector} from '../../ducks/people'
import {eventListSelector} from '../../ducks/events'



const basicStyles = {
    width: 400,
    height: 400,
    top: '40px',
    right: 0,
    position: 'fixed'
}

class RecycleBin extends Component {

    render() {
        const { connectDropTarget, canReceive, isHovered, peopleInBin, peopleList, eventsInBin, eventsList, emptyBin } = this.props

        const dndStyles = {
            color: `${canReceive ?
                isHovered ? 'green' : 'red'
                : 'black'}`
        }

        const personCardList = peopleInBin.map(id => {
           const person = peopleList.find(item => item.uid === id);
            return <li key={person.uid}>{person.email}</li>
        });

        const eventsCardList = eventsInBin.map(id => {
            const event = eventsList.find(item => item.uid === id);
            return <li key={event.uid}>{event.title}</li>
        });



        return (
            <div style={basicStyles}>
                {connectDropTarget(<h1 style={dndStyles}> Recycle bin </h1>)}
                {personCardList.length ?
                    <div>
                        <h2>Deleted persons: </h2>
                        <ul>{personCardList}</ul>
                    </div> : null}
                {eventsCardList.length ?
                    <div>
                        <h2>Deleted events: </h2>
                        <ul>{eventsCardList}</ul>
                    </div> : null}
                {eventsCardList.length || personCardList.length ?
                    <button onClick={emptyBin}>Empty bin</button> : null}
            </div>
        )
    }
}

const specTarget = {
    drop(props, monitor) {
        const item = monitor.getItem();
        switch (monitor.getItemType()) {
            case 'event':
                props.eventToBin(item.id)
                break;
            case 'person':
                props.personToBin(item.id)
                break;
        }
    },
}

const collectTarget = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canReceive: monitor.canDrop(),
    isHovered: monitor.isOver()
})



export default connect((state) => ({
    peopleInBin: peopleInBinSelector(state),
    peopleList:  peopleListSelector(state),
    eventsInBin: eventsInBinSelector(state),
    eventsList:  eventListSelector(state)
}), {eventToBin, personToBin, emptyBin })((DropTarget(['person', 'event'], specTarget, collectTarget)(RecycleBin)))