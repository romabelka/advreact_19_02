import React, {Component, PropTypes} from 'react'
import {reduxForm, Field} from 'redux-form'


export class ClientsForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <form>
                <h2>Client Form</h2>
                <div>
                    first name: <Field onChange={this.props.onChange} name = "firstname" component = "input" />
                </div>
                <div>
                    last name: <Field onChange={this.props.onChange} name = "lastname" component = "input" />
                </div>
                <div>
                    email: <Field onChange={this.props.onChange} name = "email" component = "input" />
                </div>
                <button type = "submit">Submit</button>
            </form>
        )
    }
}

export default reduxForm({
    form: 'client'
})(ClientsForm)