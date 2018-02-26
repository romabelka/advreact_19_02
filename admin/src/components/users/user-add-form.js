import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/ErrorField'
import {formName} from '../../ducks/users'

class UserAddForm extends Component {
    static propTypes = {

    };

    render() {
        return (
            <form onSubmit = {this.props.handleSubmit}>
                <h2>User Add Form</h2>
				<Field name = "firstName" label = "First Name" component = {ErrorField} />
				<Field name = "lastName" label = "Last Name" component = {ErrorField} />
				<Field name = "email" label = "Email" component = {ErrorField} />
                <button type = "submit">Submit</button>
            </form>
        )
    }
}

const validate = ({ firstName, lastName, email }) => {
	const errors = {}

	if (!email) errors.email = 'Email is a required field'
	if (email && !emailValidator.validate(email)) errors.email = 'invalid email'

	if (!firstName) errors.firstName = 'First Name is a required field'
	if (!lastName) errors.lastName = 'Last Name is a required field'

	return errors
}

export default reduxForm({
    form: formName,
	validate
})(UserAddForm)