import React, {Component} from 'react'
import {connect} from 'react-redux'
import UsersList from '../../users/users-list'
import UserAddForm from '../../users/user-add-form'
import {userAdd} from '../../../ducks/users'
import {usersSelector} from '../../../ducks/users'

class UsersRoute extends Component {
    static propTypes = {};

    render() {
        return (
            <div>
				<UserAddForm onSubmit = {this.handleUserAdd}/>
				<UsersList users = {this.props.users}/>
            </div>
        )
    }

    handleUserAdd = ({ firstName, lastName, email }) => this.props.userAdd(firstName, lastName, email)
}

const mapStateToProps = state => ({
	users: usersSelector(state)
})

export default connect(mapStateToProps, { userAdd })(UsersRoute)