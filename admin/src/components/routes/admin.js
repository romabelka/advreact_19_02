import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddUserForm from '../user/add-user-form';
import { addUser } from '../../ducks/users';

class AdminRoute extends Component {
	static propTypes = {};

	render() {
		return (
				<div>
					<h1>Admin route</h1>
					<AddUserForm onSubmit={this.props.addUser} />
				</div>
		);
	}
}

export default connect(null, {addUser})(AdminRoute);