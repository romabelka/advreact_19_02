import React, { Component } from 'react'
import {connect} from 'react-redux'
import {selectedEventsList} from '../../ducks/events'
import { TransitionMotion, spring } from 'react-motion'
import EventCard from './event-card'

class SelectedEvents extends Component {
    static propTypes = {

    };

    render() {
        return (
            <TransitionMotion
                styles = {this.getStyles()}
                willLeave = {() => ({ opacity: spring(0, { stiffness: 10 })})}
                willEnter = {() => ({ opacity: 0 })}
            >
                {interpolated => (
                    <div>
                        {this.getItems(interpolated)}
                    </div>
                )}
            </TransitionMotion>
        )
    }

    getStyles() {
        return this.props.selected.map(event => ({
            key: event.uid,
            data: event,
            style: { opacity: spring(1, { stiffness: 30 })}
        }))
    }

    getItems(interpolated) {
        return interpolated.map(item => <div style = {item.style} key={item.key}><EventCard event = {item.data}/></div>)
    }
}

export default connect(state => ({
    selected: selectedEventsList(state)
}))(SelectedEvents)