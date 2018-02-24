import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, NavLink} from 'react-router-dom'
import ClientsForm from '../clients/clients-form'
import {clientSubmit} from '../../ducks/client'

class ClientRoute extends Component {

    render() {

        return (
            <div>
                <div>
                    <div>
                        <NavLink
                            to = "/clients/clients"
                            activeStyle = {{ color: 'red' }}
                        >
                            Clients
                        </NavLink>
                    </div>
                </div>
                <div>
                    <Route
                        path = "/clients/clients"
                        render = {() => <ClientsForm onSubmit = {this.handleSubmit}/>}
                    />
                </div>
            </div>
        )
    }

    handleSubmit = ({ firstname, lastname, email }) => this.props.clientSubmit(firstname, lastname, email)
}

export default connect(null, { clientSubmit })(ClientRoute)