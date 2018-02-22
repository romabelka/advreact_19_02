import React, {Component} from 'react'
import {Route, NavLink} from 'react-router-dom'
import SignInForm from '../../auth/sign-in-form'
import SignUpForm from '../../auth/sign-up-form'

class AuthRoute extends Component {
    static propTypes = {};

    render() {
        return (
            <div>
                <div>
                   <div><NavLink to = "/auth/sign-in" activeStyle = {{ color: 'red' }}>Sign In</NavLink></div>
                   <div><NavLink to = "/auth/sign-up" activeStyle = {{ color: 'red' }}>Sign Up</NavLink></div>
                </div>
                <div>
                    <Route path = "/auth/sign-in" render = {() => <SignInForm onSubmit = {this.handleSignIn}/>}/>
                    <Route path = "/auth/sign-up" render = {() => <SignUpForm onSubmit = {this.handleSignUp}/>}/>
                </div>
            </div>
        )
    }

    handleSignIn = (value) => console.log(value)
    handleSignUp = (value) => console.log(value)
}

export default AuthRoute