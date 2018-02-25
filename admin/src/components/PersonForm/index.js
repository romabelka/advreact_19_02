import React, { Component } from 'react'
import {reset, reduxForm, Field} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/ErrorField'


class PersonForm extends Component {
    render() {
        return (
            <form onSubmit = {this.props.handleSubmit}>
                <h2>Person form</h2>
                <div>
                    <Field label = "First name" name = "first_name" component = { ErrorField } />
                </div>
                <div>
                    <Field label = "Last Name" name = "last_name" component = { ErrorField } />
                </div>
                <div>
                    <Field label = "Email" name = "email" component = { ErrorField } />
                </div>
                <button type = "submit">Add</button>
            </form>
        )
    }
}

const validate = ({ first_name, last_name, email }) => {
    const errors = {}

    if (!first_name) errors.first_name = 'Required field'

    if (!last_name) errors.last_name = 'Required field'

    if (!email) errors.email = 'Required field'
    if (email && !emailValidator.validate(email)) errors.email = 'Invalid email'

    return errors
}

const onSubmitSuccess = (result, dispatch) => dispatch(reset('person'))

export default reduxForm({
    form: 'person',
    validate,
    onSubmitSuccess
})(PersonForm)