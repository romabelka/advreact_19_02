import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import ErrorField, { validatePeople } from '../common/ErrorField'

class AddPeopleForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <h2>Add people</h2>
                <Field name="firstName" label="First name" component={ErrorField} />
                <Field name="lastName" label="Last name" component={ErrorField} />
                <Field name="email" label="Email" component={ErrorField} />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default reduxForm({
    form: 'addPeopleForm',
    validate: validatePeople
})(AddPeopleForm)