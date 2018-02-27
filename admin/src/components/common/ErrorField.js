import React, { Component } from 'react'

class ErrorFiled extends Component {
    static propTypes = {

    };

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

export default ErrorFiled