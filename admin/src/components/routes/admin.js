import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Route, NavLink} from 'react-router-dom'
import PersonAddForm from '../person/add'
import { personAdd } from '../../ducks/person'
import PersonsList from '../person/list'

class AdminRoute extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h1>Admin route</h1>
                <div>
                    <div><NavLink to = "/admin/persons/list" activeStyle = {{ color: 'red' }}>List</NavLink></div>
                    <div><NavLink to = "/admin/persons/add" activeStyle = {{ color: 'red' }}>Add</NavLink></div>
                </div>
                <div>
                    <Route path = "/admin/persons/list" render = {() => <PersonsList/>}/>
                    <Route path = "/admin/persons/add" render = {() => <PersonAddForm onSubmit = {this.handlePersonAdd}/>}/>
                </div>
            </div>
        )
    }

	handlePersonAdd = (values) => this.props.personAdd(values)
}

export default connect(null, { personAdd })(AdminRoute)