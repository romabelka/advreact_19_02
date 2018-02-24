import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'

import ErrorField from '../common/ErrorField.js'
import emailValidator from 'email-validator'
import {addCustomer} from '../../ducks/add-customer.js'


export const formName = 'addCustomer'

class AddCustomerForm extends Component {
    render() {
        return (
            <form onSubmit = {this.props.handleSubmit}>
                <h1>Add new user</h1>
                <div> <Field name = "lastName" label = "Last name" component = {ErrorField} /> </div>
                <div> <Field name = "firstName" label = "First name" component = {ErrorField} /> </div>
                <div> <Field name = "email" label = "EMail" component = {ErrorField} /> </div>
                <button type = "submit">Submit</button>
            </form>
        )
    }
}

const validate = ({lastName, email}) => {
    const errors = {}

    if (!lastName) errors.lastName = 'Last name required'
    if (email && !emailValidator.validate(email)) errors.email = 'invalid email'

    return errors
}


export default reduxForm({
    form: formName,
    validate,
    onSubmit: (values, dispatch) => dispatch(addCustomer(values))
})(AddCustomerForm)