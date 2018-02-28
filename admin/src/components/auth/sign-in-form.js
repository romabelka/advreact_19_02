import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import ErrorField, {validate} from '../common/ErrorField'



class SignInForm extends Component {

    render() {
        return (
            <form onSubmit = {this.props.handleSubmit}>
                <h2>Sign In Form</h2>
                <Field name = "email" label = "Email" component = {ErrorField} />
                <Field name = "password" label = "Password" component = {ErrorField} type = "password" />
                <button type = "submit">Submit</button>
            </form>
        )
    }
}

export default reduxForm({
    form: 'auth',
    validate
})(SignInForm)