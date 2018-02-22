import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'

class SignInForm extends Component {
    static propTypes = {

    };

    render() {
        return (
            <form onSubmit = {this.props.handleSubmit}>
                <h2>Sign In Form</h2>
                <div>
                    email: <Field name = "email" component = "input" />
                </div>
                <div>
                    password: <Field name = "password" component = "input" type = "password" />
                </div>
                <button type = "submit">Submit</button>
            </form>
        )
    }
}

export default reduxForm({
    form: 'auth'
})(SignInForm)