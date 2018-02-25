import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import ErrorField from './common/ErrorField'

class AddPeopleForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <h1>Add person</h1>
                <Field name="firstName" label="First name" component={ErrorField}/>
                <Field name="lastName" label="Last name" component={ErrorField}/>
                <Field name="email" label="Email" component={ErrorField} type="email"/>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

const validate = ({ firstName, lastName, email }) => {
    const errors = {}
    if (!firstName) errors.firstName = 'The field is required'
    if (!lastName) errors.lastName = 'The field is required'
    if (!email) errors.email = 'The field is required'
    return errors
}

export default reduxForm({
        form: 'addPeople',
        validate,
    },
)(AddPeopleForm)
