import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/ErrorField'


class AddUserForm extends Component {

    render() {
        return (
            <form onSubmit = {this.props.handleSubmit}>
                <h1>Add User Form</h1>
                <Field name = "email" label = "Email" component = {ErrorField} />
                <Field name = "firstName" label = "First Name" component = {ErrorField} />
                <Field name = "lastName" label = "Last Name" component = {ErrorField} />
                <button type = "submit">Submit</button>
            </form>
        )
    }
}

const validate = ({ email, firstName, lastName }) => {
    const errors = {}

    if (!email) errors.email = 'required field'
    if (email && !emailValidator.validate(email)) errors.email = 'invalid email'


	if (!firstName) errors.firstName = 'first Name is a required field'

	if (!lastName) errors.lastName = 'last Name is a required field'

    return errors
}

export default reduxForm({
    form: 'addUser',
    validate
})(AddUserForm)