import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import ErrorField from '../common/ErrorField'

class AddUserForm extends Component {
    render() {
        return (
            <form onSubmit = {this.props.handleSubmit}>
                <h2>Add User:</h2>
                <div>
                    <Field name="firstName" label="First name" component={ErrorField}/>
                </div>
                <div>
                    <Field name="lastName" label="Last name" component={ErrorField}/>
                </div>
                <div>
                    <Field name="userEmail" label="User email" component={ErrorField} type="email"/>
                </div>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

const validate = ({ firstName, lastName, email }) => {
    const errors = {};
    if (!firstName) errors.firstName = 'The field is required';
    if (!lastName) errors.lastName = 'The field is required';
    if (!email) errors.email = 'The field is required';
    return errors
}

export default reduxForm({ form: 'addUser', validate })(AddUserForm)