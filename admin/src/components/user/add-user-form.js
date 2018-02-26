import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import emailValidator from 'email-validator';
import ErrorField from '../common/ErrorField';

class AddUserForm extends Component {
	static propTypes = {};

	render() {
		return (
				<form onSubmit={this.props.handleSubmit}>
					<h2>Add user</h2>
						<Field label="first name" name="first" component={ErrorField}/>
						<Field label="last name" name="last" component={ErrorField}/>
						<Field label="email" name="email" component={ErrorField}/>
					<button type="submit">Submit</button>
				</form>
		);
	}
}

const validate = ({first, last, email}) => {
	const errors = {};

	if (!email) errors.email = 'required field';
	if (email && !emailValidator.validate(email)) errors.email = 'invalid email';

	if (!first) errors.first = 'first name is a required field';
	if (first && first.length < 1) errors.first = 'first name is to short';

	if (!last) errors.last = 'last name is a required field';
	if (last && last.length < 1) errors.last = 'last name is to short';

	return errors;
};

export default reduxForm({
	form: 'add-user-form',
	validate
})(AddUserForm);