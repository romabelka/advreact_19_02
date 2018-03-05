import React, { Component } from 'react'

class PersonCard extends Component {
    static propTypes = {

    };

    render() {
        const { person } = this.props
        return (
            <div>
                <h1>{person.firstName} <b>{person.lastName}</b></h1>
                <h3>{person.email}</h3>
            </div>
        )
    }
}

export default PersonCard