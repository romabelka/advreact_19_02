import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, NavLink} from 'react-router-dom'
import SignInForm from '../../auth/sign-in-form'
import SignUpForm from '../../auth/sign-up-form'
import {signUp, signIn} from '../../../ducks/auth'

class AuthRoute extends Component {
    static propTypes = {};

    render() {
        return (
            <div>
                <div>
                   <div><NavLink to = "/auth/sign-in" activeStyle = {{ color: 'red' }}>Sign In</NavLink></div>
                   <div><NavLink to = "/auth/sign-up" activeStyle = {{ color: 'red' }}>Sign Up</NavLink></div>
                   <div><NavLink to = "/clients/client" activeStyle = {{ color: 'red' }}>Clients</NavLink></div>
                </div>
                <h1>Authentication</h1>
                <div>
                    <Route path = "/auth/sign-in" render = {() => <SignInForm onSubmit = {this.handleSignIn}/>}/>
                    <Route path = "/auth/sign-up" render = {() => <SignUpForm onSubmit = {this.handleSignUp}/>}/>
                </div>
            </div>
        )
    }

    handleSignIn = ({ email, password }) => this.props.signIn(email, password)
    handleSignUp = ({ email, password }) => this.props.signUp(email, password)
}

export default connect(null, { signIn, signUp })(AuthRoute)