import React, { Component } from 'react'

class UsersList extends Component {
    static propTypes = {

    };

    render() {
        return (
        	<div>
                <h2>Users List</h2>
				<table>
					<thead>
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
						</tr>
					</thead>
					<tbody>
						{this.props.users.toArray().map((user) =>
							<tr key = {user.email}>
								<td>{user.firstName}</td>
								<td>{user.lastName}</td>
								<td>{user.email}</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
        )
    }
}

export default UsersList