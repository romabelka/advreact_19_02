import React, {Component, PropTypes} from 'react'
import {reduxForm, Field} from 'redux-form'


export class ClientsForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <form onSubmit = {this.props.handleSubmit}>
                <h2>Client Form</h2>
                <div>
                    first name: <Field name = "firstname" component = "input" />
                </div>
                <div>
                    last name: <Field name = "lastname" component = "input" />
                </div>
                <div>
                    email: <Field name = "email" component = "input" />
                </div>
                <button type = "submit">Submit</button>
            </form>
        )
    }
}

export default reduxForm({
    form: 'client'
})(ClientsForm)