import React, { Component } from 'react'
import {connect} from 'react-redux'
import { TransitionMotion, spring } from 'react-motion'
import {peopleListSelector, fetchAllPeople} from '../../ducks/people'
import {List} from 'react-virtualized'
import PersonCard from './person-card'

import 'react-virtualized/styles.css'

class PeopleList extends Component {
    componentDidMount() {
        this.props.fetchAllPeople()
    }

    render() {
        return (
            <TransitionMotion
                styles={this.getStyles()}
                willLeave = {() => ({ opacity: spring(0, { stiffness: 30 })})}
                willEnter = {() => ({ opacity: 0 })}
            >
                {interpolated => (
                    <List
                        rowRenderer={this.interpolatedRowRenderer(interpolated)}
                        rowCount={interpolated.length}
                        rowHeight={100}
                        height={400}
                        width={400}
                    />
                )}
            </TransitionMotion>
        )
    }

    getStyles() {
        return this.props.people.map(person => ({
            key: person.uid,
            data: person,
            style: { opacity: spring(1, { stiffness: 30 })}
        }))
    }

    interpolatedRowRenderer(interpolated) {
        return ({ style, index, key }) =>  {
             return this.rowRenderer({
                style: {...style, ...interpolated[index].style},
                key,
                person: interpolated[index].data,
            })
        }

    }

    rowRenderer = ({ style, person, key }) => {
        return (
            <div style={style} key={key}>
                <PersonCard person = {person}/>
            </div>
        )
    }
}

export default connect((state) => ({
    people: peopleListSelector(state)
}), { fetchAllPeople })(PeopleList)