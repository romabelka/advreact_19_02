import React, { Component } from 'react'
import {connect} from 'react-redux'
import {peopleListSelector, fetchAllPeople} from '../../ducks/people'
import {List} from 'react-virtualized'
import PersonCard from './person-card'
import { TransitionMotion, spring } from 'react-motion'

import 'react-virtualized/styles.css'

class PeopleList extends Component {
    componentDidMount() {
        this.props.fetchAllPeople()
    }

    render() {
        return <TransitionMotion
            styles = { this.getStyles() }
            willLeave = {() => ({ opacity: spring(0, { stiffness: 10 })})}
            willEnter = {() => ({ opacity: 0 })}
        >
            {interpolated => (
                <List
                    rowRenderer={ this.rowRenderer }
                    rowCount={this.props.people.length}
                    rowHeight={100}
                    height={400}
                    width={400}
                />
            )}

        </TransitionMotion>
    }

    getStyles() {
        return this.props.people.map( item => {
            return {
                //key: item.uid,
                //data: item,
                style: { opacity: spring(10, { stiffness: 30 })}
            }
        })
    }

    rowRenderer = ({ style, index, key }) => {
        const person = this.props.people[index]
        const interpolatedStyle = this.getStyles()[index].style

        return <div style={{...style, ...interpolatedStyle}} key={key}>
            <PersonCard person={person}/>
        </div>
    }
}

export default connect((state) => ({
    people: peopleListSelector(state)
}), { fetchAllPeople })(PeopleList)