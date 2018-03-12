import React, { Component } from 'react'
import { connect } from 'react-redux'
import { personSelector } from '../../ducks/people'

class PersonDragPreview extends Component {
    static propTypes = {

    };

    render() {
        const { person } = this.props
        return (person ? <div><h1>{person.email}</h1></div> : null)
    }
}

export default connect((state, props) => ({
    person: personSelector(state, props)
}))(PersonDragPreview)