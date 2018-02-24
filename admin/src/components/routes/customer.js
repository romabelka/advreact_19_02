import React, { Component } from 'react'
import {Route, NavLink} from 'react-router-dom'
import AddCustomerForm from '../customers/add-customer-form.js'

class CustomerRoute extends Component {

    render() {
        return (
            <div>
                <h1>Customers</h1>
                <div>
                    <div><NavLink to = "/customers/add" activeStyle = {{ color: 'red' }}>AddCustomer</NavLink></div>
                </div>
                <div>
                    <Route path = "/customers/add" component={AddCustomerForm}/>
                </div>

            </div>

        )
    }
}

export default CustomerRoute