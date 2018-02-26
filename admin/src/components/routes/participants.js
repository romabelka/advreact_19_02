import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import ParticipantsForm from '../participants/form'
import {create} from '../../ducks/participants'

class ParticipantsRoute extends Component {
    handleParticipantCreate = ({ name, lastName, email }) =>
        this.props.create(name, lastName, email)

    render() {
        return (
            <div>
                <Route path = "/participants/create" render = {
                    () => <ParticipantsForm onSubmit = {this.handleParticipantCreate}/>
                }/>
            </div>
        );
    }
}

export default connect(null, { create })(ParticipantsRoute);
