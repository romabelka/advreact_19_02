import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Route, NavLink} from 'react-router-dom'
import AddUserForm from '../users/add-user-form'
import { addUser } from '../../ducks/users'

class AdminRoute extends Component {
    static propTypes = {

    };

    handleUserSubmit = user => this.props.addUser(user)

    render() {
        return (
            <div>
                <h1>Admin route</h1>
                <div>
	                <NavLink to="/admin/add-user" activeStyle = {{ color: 'red' }}>Add user</NavLink>
                </div>
                <div>
	                <Route path="/admin/add-user" render={() => <AddUserForm onSubmit={this.handleUserSubmit} />} />
                </div>
            </div>
        )
    }
}

export default connect(null, { addUser })(AdminRoute)