import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, NavLink } from 'react-router-dom'
import AddUserForm from '../users/add-user-form';
import { addUser } from '../../ducks/users'

class AdminRoute extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h1>Admin route</h1>
                <NavLink to="/admin/add-user" activeStyle={{ color: 'red' }} />
                <div>
                    <Route path = "/admin/add-user" render = {() => <AddUserForm onSubmit={this.handleAddUser} />}/>
                </div>
            </div>
        )
    }

    handleAddUser = ({ firstName, lastName, email }) => this.props.addUser(firstName, lastName, email)
}

export default connect(null, { addUser })(AdminRoute)
