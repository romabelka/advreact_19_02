import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, NavLink } from 'react-router-dom'
import AddPeopleForm from '../../people/add-people-form'
import ShowPeople from '../../people/show-people'
import { addPeople } from '../../../ducks/people'

class PeopleRoute extends Component {
    render() {
        return (
            <div>
                <div>
                    <div><NavLink to="/people/add" activeStyle={{ color: 'red' }}>Add people</NavLink></div>
                    <div><NavLink to="/people/show" activeStyle={{ color: 'red' }}>Show people</NavLink></div>
                </div>
                <div>
                    <Route path="/people/add" render={() => <AddPeopleForm onSubmit={this.handleAddPeople} />} />
                    <Route path="/people/show" render={() => <ShowPeople />} />
                </div>
            </div>
        )
    }

    handleAddPeople = ({ firstName, lastName, email }) => this.props.addPeople(firstName, lastName, email)
}

export default connect(null, { addPeople })(PeopleRoute)