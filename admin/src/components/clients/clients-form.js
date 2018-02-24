import React, {Component, PropTypes} from 'react'
import {reduxForm, Field} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/ErrorField'

export class ClientsForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <form onSubmit = {this.props.handleSubmit}>
                <h2>Client Form</h2>
                <div>
                    <Field name = "firstname" label = "firstname" component = {ErrorField}/>
                </div>
                <div>
                    <Field name = "lastname" label = "lastname" component = {ErrorField} />
                </div>
                <div>
                    <Field label = "email" name = "email" component = {ErrorField}/>
                </div>
                <button type = "submit">Submit</button>
            </form>
        )
    }
}

const validate = ({firstname, lastname, email}) => {
    const errors = {}

    if (!email) errors.email = 'required field'
    if (email && !emailValidator.validate(email)) errors.email = 'invalid email'

    if (!firstname) errors.firstname = 'required field'

    if (!lastname) errors.lastname = 'required field'

    return errors
}

export default reduxForm({
    form: 'client',
    validate
})(ClientsForm)