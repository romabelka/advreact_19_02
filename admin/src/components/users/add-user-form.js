import React, { Component } from 'react'
import { reduxForm, Field, reset } from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/ErrorField'

class AddUserForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <h1>Add new user</h1>
        <Field name="firstName" label="First Name" component={ErrorField} />
        <Field name="lastName" label="Last Name" component={ErrorField} />
        <Field name="email" label="Email" component={ErrorField} />
        <button type="submit">Add</button>
      </form>
    )
  }
}

const validate = ({firstName, lastName, email}) => {
  const errors = {}

  if (!firstName) errors.firstName = "Required"
  if (!lastName) errors.lastName = "Required"
  if (!email) errors.email = "Required"
  if (email && !emailValidator.validate(email)) errors.email = "Invalid email"
}

const onSubmitSuccess = (result, dispatch) => dispatch(reset('addUser'))

export default reduxForm({
  form: 'addUser', 
  validate,
  onSubmitSuccess
})(AddUserForm)
