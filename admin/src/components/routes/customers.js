import React, { Component } from 'react'
import {connect} from 'react-redux'
import AddCustomerForm from '../customers/add-customer-form'
import {addCustomer} from '../../ducks/customers'

class CustomersRoute extends Component {
  handleAddCustomer = ({ firstName, lastName, email }) => this.props.addCustomer(firstName, lastName, email)

  render() {
    return (
      <div>
        <h1>Customers route</h1>
        <div>
          <AddCustomerForm onSubmit={this.handleAddCustomer} />
        </div>
      </div>
    )
  }
}

export default connect(null, { addCustomer })(CustomersRoute)