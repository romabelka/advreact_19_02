import React from 'react'
import {reduxForm, Field} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/ErrorField'

const AddUserForm = ({ handleSubmit }) => (
	<form onSubmit = {handleSubmit}>
		<h2>User form:</h2>
		<div>
			<Field name="first_name" label="First name" component={ErrorField} />
		</div>
		<div>
			<Field name="last_name" label="Last name" component={ErrorField} />
		</div>
		<div>
			<Field name="email" label="Email" component={ErrorField} />
		</div>
		<button type = "submit">Submit</button>
	</form>
);

const validate = ({ first_name, last_name, email }) => {
	const errors = {}

	if (!first_name) errors.first_name = '"first name" is required field'

	if (!last_name) errors.last_name = '"last name" is required field'

	if (!email) errors.email = '"email" is required field'
	if (email && !emailValidator.validate(email)) errors.email = 'invalid email'

	return errors
}

export default reduxForm({
	form: 'user',
	validate
})(AddUserForm)