import React, { Component } from 'react'
import emailValidator from 'email-validator'

class ErrorFiled extends Component {
    render() {
        const { input, type, label, meta: { error, touched } } = this.props
        const errorText = error && touched && <h4 style = {{ color: 'red' }}>{error}</h4>
        return (
            <div>
                <div>
                    {label}: <input {...input} type = {type} />
                </div>
                {errorText}
            </div>
        )
    }
}

export const validate = ({ email, password }) => {
    const errors = {}

    if (!email) errors.email = 'required field'
    if (email && !emailValidator.validate(email)) errors.email = 'invalid email'

    if (!password) errors.password = 'password is a required field'
    if (password && password.length < 8) errors.password = 'password is to short'

    return errors
}

export default ErrorFiled