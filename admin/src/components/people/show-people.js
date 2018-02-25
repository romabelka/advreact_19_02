import React, { Component } from 'react'
import { connect } from 'react-redux'
import { peopleSelector } from '../../ducks/people'

class ShowPeople extends Component {
    render() {
        return (<div>
            <h1> Show added people </h1>
            {this.props.people.map((item, index) => {
                return (<div key={index}>
                    {item.firstName} - {item.lastName} - {item.email}
                </div>)
            })}
        </div>)
    }
}

export default connect(state => ({
    people: peopleSelector(state)
}), null, null, { pure: false })(ShowPeople)