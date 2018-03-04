import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'react-virtualized'
import { peopleSelector, loadPersons } from '../../ducks/people'

class PeopleList extends Component {
    static propTypes = {};

    componentDidMount(){
        this.props.loadPersons()
    }

    render() {
        return <List
            width={600}
            height={400}
            rowCount={this.props.people.length}
            rowHeight={200}
            overscanRowCount={2}
            rowRenderer={this.rowRenderer}
        />
    }

    rowRenderer = ({index, style}) => {
        const person = this.props.people[index]

        return (
            <div key={person.uid} style = {style}>
                <h2>{person.email}</h2>
                <h4>{person.firstName} {person.lastName}</h4>
            </div>
        )

    }
}

export default connect(state => ({
    people: peopleSelector(state)
}), {loadPersons})(PeopleList)