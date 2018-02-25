import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, NavLink} from 'react-router-dom'
import AddUserForm from '../../user/AddUserForm'
import ShowUsers from '../../user/ShowUsers'
import { addUser } from '../../../ducks/user'

class UserRoute extends Component {
    render() {
        return (
            <div>
                <NavLink to = "/user/add" activeStyle = {{ color: 'red' }}>Add User</NavLink>
                <NavLink to = "/user/show" activeStyle = {{ color: 'red' }}>Show Users</NavLink>
                <div>
                    <Route
                        path = "/user/add"
                        render = {()=><AddUserForm onSubmit={this.handleAddUser}/>} />
                    <Route path = "/user/show" component = { ShowUsers } />
                </div>
            </div>
        )
    }

    handleAddUser = ({ firstName, lastName, userEmail }) => {
        this.props.addUser(firstName, lastName, userEmail)
    }

}

export default connect(null, { addUser })(UserRoute)