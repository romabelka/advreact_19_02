import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import ErrorField from '../common/ErrorField'

class EmployeeForm extends Component {

    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <h1>Create new employee</h1>
                <Field name = "firstName" label = "First Name" component = {ErrorField} />
                <Field name = "lastName" label = "Last Name" component = {ErrorField} />
                <br/>
                <button type = "submit">Submit</button>
            </form>
        )
    }
}

const validate = ({ firstName, lastName }) => {
    const errors = {}

    if (!firstName) errors.email = 'required field'
    if (!lastName) errors.email = 'required field'

    return errors
}

export default reduxForm({
    form: 'employee',
    validate
})(EmployeeForm)