import React, { Component } from 'react'
import {connect} from 'react-redux'
import {userSelector, signOut} from '../../ducks/auth'

class SignOut extends Component {
    render() {
        const {user, signOut} = this.props
        return (
            <div>
                {user ? <button onClick={signOut}>Sign out</button> : null}
            </div>
        )
    }
}

export default connect(
    (state) => ({
        user: userSelector(state)
    }),
    {signOut}
)(SignOut)