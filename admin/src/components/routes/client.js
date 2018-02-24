import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, NavLink} from 'react-router-dom'
import ClientsForm from '../clients/clients-form'
import {clientInit, clientUpdate} from '../../ducks/client'

class ClientRoute extends Component {

    componentDidMount(){
        this.clientInit()
    }

    render() {
        const {...props} = this.props
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
                        render = {() => <ClientsForm {...props} onChange = {this.handleFormChange}/>}
                    />
                </div>
            </div>
        )
    }

    handleFormChange = (name, value) => {
        let {client} = this.props;
        client[name] = value;
        this.props.clientUpdate(client)
    }

    clientInit = () => this.props.clientInit()
}

const mapStateToProps = ({client}) => {
    return {
        client,
    }
}

export default connect(mapStateToProps, { clientInit, clientUpdate })(ClientRoute)