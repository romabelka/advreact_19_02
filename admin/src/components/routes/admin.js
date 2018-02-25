import React, { Component } from 'react'
import { connect } from 'react-redux'
import PersonForm from '../PersonForm'
import { addPerson } from '../../ducks/admin'

class AdminRoute extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h1>Admin route</h1>
                <PersonForm onSubmit = { this.props.addPerson }/>
            </div>
        )
    }
}

export default connect(null, { addPerson })(AdminRoute)