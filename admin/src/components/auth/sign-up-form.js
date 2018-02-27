import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/ErrorField'


class SignUpForm extends Component {
    static propTypes = {

    };

    render() {
        return (
            <form onSubmit = {this.props.handleSubmit}>
                <h1>Sign Up Form</h1>
                <Field name = "email" label = "Email" component = {ErrorField} />
                <Field name = "password" label = "Password" component = {ErrorField} type = "password" />
                <button type = "submit">Submit</button>
            </form>
        )
    }
}

const validate = ({ email, password }) => {
    const errors = {}

    if (!email) errors.email = 'required field'
    if (email && !emailValidator.validate(email)) errors.email = 'invalid email'

    if (!password) errors.password = 'password is a required field'
    if (password && password.length < 8) errors.password = 'password is to short'

    return errors
}

export default reduxForm({
    form: 'auth',
    validate
})(SignUpForm)