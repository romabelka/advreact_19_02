import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {userSelector} from '../../ducks/auth'

class ProtectedRoute extends Component {
    static propTypes = {

    };

    render() {
        const {component, ...rest} = this.props
        return <Route {...rest} render = {this.getComponent}/>
    }

    getComponent = (...args) => {
        return this.props.isAuthorized ? <this.props.component {...args} /> : <h1>Unauthorized</h1>
    }
}

export default connect(state => ({
    isAuthorized: userSelector(state)
}), null, null, { pure: false })(ProtectedRoute)