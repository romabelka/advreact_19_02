import React, { Component } from 'react'
import {reduxForm, Field, reset} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/ErrorField'

class AddCustomerForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <h2>Add Customer Form</h2>
        <div>
          <Field name="firstName" label="First Name" component={ErrorField} />
        </div>
        <div>
          <Field name="lastName" label="Last Name" component={ErrorField} />
        </div>
        <div>
          <Field name="email" label="Email" component={ErrorField} />
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const validate = ({ firstName, lastName, email }) => {
  const errors = {}

  if (!email) errors.email = 'required field'
  if (email && !emailValidator.validate(email)) errors.email = 'invalid email'

  if (!firstName) errors.firstName = 'required field'

  if (!lastName) errors.lastName = 'required field'

  return errors
}

export default reduxForm({
  form: 'customerForm',
  validate,
  onSubmitSuccess: (result, dispatch) => dispatch(reset('customerForm'))
})(AddCustomerForm)