import React, { Component } from 'react'
import {connect} from 'react-redux'
import {peopleListSelector, fetchAllPeople} from '../../ducks/people'
import {List} from 'react-virtualized'
import PersonCard from './person-card'
import { spring, TransitionMotion } from 'react-motion'

import 'react-virtualized/styles.css'

class PeopleList extends Component {
    constructor(props) {
        super(props)
        this.state = {
          scrollToIndex: undefined
        }
    }
    componentDidMount() {
        this.props.fetchAllPeople()
    }

    componentDidUpdate({ people }) {
        if (people && people.length && people.length < this.props.people.length) {
            this.setState({ scrollToIndex: this.props.people.length - 1 })
        }
    }

    render() {
        return <TransitionMotion
            styles={this.getStyles()}
            willLeave={() => ({ opacity: spring(0, { stiffness: 150 }) })}
            willEnter={() => ({ opacity: 0 })}
        >
            {interpolated => (
                <List
                    rowRenderer={this.rowRenderer(interpolated)}
                    rowCount={interpolated.length}
                    rowHeight={100}
                    height={400}
                    width={400}
                    scrollToIndex={this.state.scrollToIndex}
                />)}
        </TransitionMotion>

    }

    getStyles() {
        return this.props.people.map(person => ({
            style: { opacity: spring(1, { stiffness: 60 }) },
            data: person,
            key: person.uid,
        }))
    }

    rowRenderer = (interpolated) => ({ style, index, key }) => {
        const person = interpolated[index].data
        const interpolatedStyle = interpolated[index].style
        return (
            <div style={{ ...style, ...interpolatedStyle }} key={key}>
                <PersonCard person = {person}/>
            </div>
        )
    }
}

export default connect((state) => ({
    people: peopleListSelector(state)
}), { fetchAllPeople })(PeopleList)
