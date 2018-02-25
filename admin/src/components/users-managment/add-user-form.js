import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import validator, {VALIDATORS} from '../../utils/validaton'
import ErrorField from '../common/ErrorField'


class AddUserForm extends Component {
    render() {
        return (
            <form onSubmit = {this.props.handleSubmit}>
                <h1>Add User</h1>
                <Field name = "firstName" label = "First Name" component = {ErrorField} />
                <Field name = "lastName" label = "Last Name" component = {ErrorField} />
                <Field name = "email" label = "Email" component = {ErrorField} />
                <button type = "submit">Submit</button>
            </form>
        )
    }
}

const validate = ({ email, firstName, lastName }) => {
    const errors = {}

    const emailErrors = validator.validate(email, 'Email', [VALIDATORS.REQUIRED, VALIDATORS.EMAIL])
    if(emailErrors){
        errors.email = emailErrors
    }

    const firstNameErrors = validator.validate(firstName, 'First Name', [VALIDATORS.REQUIRED, VALIDATORS.STRIG_LENGTH])
    if(firstNameErrors){
        errors.firstName = firstNameErrors
    }

    const lastNameErrors = validator.validate(lastName, 'Last Name', [VALIDATORS.REQUIRED, VALIDATORS.STRIG_LENGTH])
    if(lastNameErrors){
        errors.lastName = lastNameErrors
    }

    return errors
}

export default reduxForm({form: 'addUser', validate})(AddUserForm)