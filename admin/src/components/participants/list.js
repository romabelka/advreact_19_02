import React, {Component} from 'react';
import {participantsSelector} from '../../ducks/participants'
import {connect} from "react-redux";

class ParticipantsList extends Component {
    render() {
        return (
            <div>
                <h2>Participants List</h2>
                <ol>
                    {this.props.participants.map((participant, index) => (
                        <li key={index}>
                            {`${participant.name} ${participant.lastName}, ${participant.email}`}
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default connect(state => ({
    participants: participantsSelector(state)
}), null, null, { pure: false })(ParticipantsList);
