import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, NavLink} from 'react-router-dom'
import AddUserForm from '../../addUser/add-user'
import {addUser} from '../../../ducks/add-user'

class AddUserRoute extends Component {

    render() {
        return (
            <div>
                <div>
                   <div><NavLink to = "/admin">Admin Home</NavLink></div>
                </div>
                <div>
                    <Route path = "/admin/add-user" render = {() => <AddUserForm onSubmit = {this.handleAddUser}/>}/>
                </div>
            </div>
        )
    }

    handleAddUser = ({ email, firstName, lastName }) => this.props.addUser(email, firstName, lastName)
}

export default connect(null, { addUser })(AddUserRoute)