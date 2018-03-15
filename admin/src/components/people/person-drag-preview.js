import React, { Component } from 'react'
import { connect } from 'react-redux'
import { personSelector } from '../../ducks/people'

class PersonDragPreview extends Component {
    static propTypes = {

    };

    render() {
        const {person} = this.props
        return (
            <div>
                <h1>{person ? this.props.person.email : null}</h1>
            </div>
        )
    }
}

export default connect((state, props) => ({
    person: personSelector(state, props)
}))(PersonDragPreview)
