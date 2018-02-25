import React, { Component } from 'react'
import AddPeopleForm from '../add-people-form'
import { connect } from 'react-redux'
import { addPerson } from '../../ducks/people'

class AdminRoute extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h1>Admin route</h1>
                <AddPeopleForm onSubmit={this.handleSubmit}/>
            </div>
        )
    }

    handleSubmit = (fields) => {
        this.props.addPerson(fields)
    }
}

export default connect(null, { addPerson })(AdminRoute)
