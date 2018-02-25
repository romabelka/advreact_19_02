import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import validator, {VALIDATORS} from '../../utils/validaton'
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

    const emailErrors = validator.validate(email, 'Email', [VALIDATORS.REQUIRED, VALIDATORS.EMAIL])
    if(emailErrors){
        errors.email = emailErrors
    }

    const passwordErrors = validator.validate(password, 'Password', [VALIDATORS.REQUIRED, VALIDATORS.STRIG_LENGTH], 8, 10)
    if(passwordErrors){
        errors.password = passwordErrors
    }

    return errors
}

export default reduxForm({
    form: 'auth',
    validate
})(SignUpForm)