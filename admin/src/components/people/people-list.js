import React, { Component } from 'react'
import {connect} from 'react-redux'
import {peopleListSelector, fetchAllPeople} from '../../ducks/people'
import {List} from 'react-virtualized'
import { TransitionMotion, spring } from 'react-motion'
import PersonCard from './person-card'

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

    componentWillReceiveProps(nextProps) {
        if (this.props.people.length !== 0 && (nextProps.people.length > this.props.people.length)) {
            this.setState({ scrollToIndex: nextProps.people.length - 1 })
        }
    }

    render() {
        return (
            <TransitionMotion
	            willEnter = {() => ({ opacity: 0 })}
                styles={this.getStyles()}
            >
                {interpolated => (
	                <List
		                rowRenderer={this.rowRenderer(interpolated)}
		                rowCount={this.props.people.length}
		                rowHeight={100}
		                height={400}
		                width={400}
		                scrollToIndex={this.state.scrollToIndex}
	                />
                )}
            </TransitionMotion>
        )
    }

    getStyles = () => this.props.people.map(p => ({
        key: p.uid,
        style: { opacity: spring(1, { stiffness: 30 })}
    }))

    rowRenderer = interpolated => ({ style, index, key }) => {
        const person = this.props.people[index]
        const interpolatedData = interpolated[index] || {}

        return (
            <div style={{...style, ...interpolatedData.style }} key={key}>
                <PersonCard person = {person}/>
            </div>
        )
    }
}

export default connect((state) => ({
    people: peopleListSelector(state)
}), { fetchAllPeople })(PeopleList)