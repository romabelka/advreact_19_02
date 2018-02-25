import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

class ShowUsers extends Component {
    buildList( obj ){
        if(!_.isEmpty(obj)){
            return(
                _.map(obj, item =>  <li key={item.userId} >{ item.userId }</li> )
            )
        } else {
            return null
        }
    }
    render() {
        const {users} = this.props;
        const usersList = this.buildList( users );
        if( _.isEmpty(users) ){
            return (
                <div>
                    <h1>No USERS List yet!</h1>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>USERS:</h1>
                    <ul>{ usersList }</ul>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    const data = state.addUser.toJS();
    return{
        users: data.users
    }
}
export default connect( mapStateToProps, null )(ShowUsers)