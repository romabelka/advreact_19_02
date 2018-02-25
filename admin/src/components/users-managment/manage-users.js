import React, { Component } from 'react'
import { connect } from 'react-redux'
import { usersListSelector, userNameSelector, userEmailSelector } from '../../ducks/users'

class ManageUsers extends Component {
    render() {

        if (!this.props.users || this.props.users.size === 0) {
            return null
        }

        const users = this.props.users.map(
            user => (
                <tr key={userNameSelector(user)}>
                    <td>{userNameSelector(user)}</td>
                    <td>{userEmailSelector(user)}</td>
                </tr>)
        )

        return (
            <div>
                Manage Users
                <table>
                    <thead>
                        <tr>
                            <td>User</td>
                            <td>Email</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(state => ({
    users: usersListSelector(state)
}
))(ManageUsers)