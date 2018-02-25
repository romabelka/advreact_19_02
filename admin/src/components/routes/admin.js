import React, { Component } from 'react'
import {Route, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import AddUserForm from '../users-managment/add-user-form';
import ManageUsers from '../users-managment/manage-users';
import {addUser} from '../../ducks/users'

class AdminRoute extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h1>Admin route</h1>
                <NavLink to = "/admin/add-users" activeStyle = {{ color: 'red' }}>
                    Add Users
                </NavLink>
                <div>
                    <Route path = "/admin/add-users" render = {() => <AddUserForm onSubmit = {this.handleAddUser} />}/>
                </div>
                <ManageUsers />
            </div>
        )
    }
    
    handleAddUser = ({ firstName, lastName, email }) => this.props.addUser(firstName, lastName, email)
}

export default connect(null, { addUser })(AdminRoute)