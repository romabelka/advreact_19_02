import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/ErrorField'

class PersonAddForm extends Component {
	static propTypes = {

	};

	render() {
		return (
			<form onSubmit = {this.props.handleSubmit}>
				<h1>Add person form</h1>
				<Field name = "fname" label = "First name" component = {ErrorField} />
				<Field name = "lname" label = "Last name" component = {ErrorField} />
				<Field name = "email" label = "Email" component = {ErrorField} />
				<button type = "submit">Submit</button>
			</form>
		)
	}
}

const validate = ({ fname, lname, email }) => {
	const errors = {}

	if (!email) errors.email = 'E-mail is a required field'
	if (email && !emailValidator.validate(email)) errors.email = 'Invalid email'

	if (!fname || !fname.trim()) errors.fname = 'First name is a required field'
	if (!lname || !lname.trim()) errors.lname = 'Last name is a required field'

	return errors
}

export default reduxForm({
	form: 'person',
	validate
})(PersonAddForm)