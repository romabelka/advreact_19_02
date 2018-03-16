import React, {Component} from 'react'
import {connect} from 'react-redux'
import {peopleListSelector, fetchAllPeople} from '../../ducks/people'
import {List} from 'react-virtualized'
import PersonCard from './person-card'
import {TransitionMotion, spring} from 'react-motion'

import 'react-virtualized/styles.css'

class PeopleList extends Component {
    componentDidMount() {
        this.props.fetchAllPeople()
    }

    componentDidUpdate({people}) {
        if (people.length && this.props.people.length > people.length) {
            setTimeout(() => {
                this.list.scrollToRow(this.props.people.length)
            }, 0)
        }
    }

    render() {
        return (
            <TransitionMotion
                willEnter={this.willEnter}
                styles={this.getStyles}
            >
                {interpolated =>
                    <List
                        rowRenderer={this.rowRenderer(interpolated)}
                        rowCount={interpolated.length}
                        rowHeight={100}
                        height={400}
                        width={400}
                        ref={this.setListRef}
                    />
                }
            </TransitionMotion>
        )
    }

    rowRenderer = interpolated => ({index, key, style}) =>
        <PersonCard person={this.props.people[index]} key={key}
                    style={{...style, ...interpolated[index].style}}/>

    willEnter = () => ({
        opacity: 0
    })

    getStyles = () => this.props.people.map(person => ({
        key: person.uid,
        style: {
            opacity: spring(1)
        },
        data: person
    }))

    setListRef = ref => this.list = ref
}

export default connect(state => ({
    people: peopleListSelector(state)
}), { fetchAllPeople })(PeopleList)