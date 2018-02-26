import React, {Component} from 'react'
import {reset, reduxForm, Field} from 'redux-form'
import ParticipantsList from './list'
import emailValidator from 'email-validator'
import ErrorField from '../common/ErrorField'

class ParticipantsForm extends Component {
    render() {
        return (
            <div>
                <form onSubmit = {this.props.handleSubmit}>
                    <h1>Create Participant</h1>
                    <Field name = 'name' label = 'Name' component = {ErrorField} type='credentials'/>
                    <Field name = 'lastName' label = 'Last Name' component = {ErrorField} type='credentials'/>
                    <Field name = 'email' label = 'Email' component = {ErrorField} />
                    <button type = 'submit'>Submit</button>
                </form>
                <div>
                    <ParticipantsList />
                </div>
            </div>
        )
    }
}
const afterSubmit = (result, dispatch) => dispatch(reset('participantForm'))

const validate = ({ name, lastName, email }) => {
    const errors = {}

    if (!email) errors.email = 'required field'
    if (email && !emailValidator.validate(email)) errors.email = 'invalid email'

    if (!name || !lastName) errors.credentials = 'Field cannot be empty'

    return errors
}

export default reduxForm({
    form: 'participantForm',
    onSubmitSuccess: afterSubmit,
    validate
})(ParticipantsForm);
