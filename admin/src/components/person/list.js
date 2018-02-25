import React, { Component } from 'react'
import {connect} from 'react-redux'
import {moduleName as personModule} from '../../ducks/person'

class PersonsList extends Component {
	static propTypes = {

	};

	render() {
		if (!this.props.persons.size) {
			return <h1>No persons added</h1>
		}

		const personsList = []
		this.props.persons.map((person) => {
			personsList.push(
				<tr key={person.email}>
					<td>{person.fname}</td>
					<td>{person.lname}</td>
					<td>{person.email}</td>
				</tr>
			)
		})

		return (
			<div>
				<h1>Persons list</h1>
				<table border="1">
					<thead>
						<tr>
							<th>First name</th>
							<th>Last name</th>
							<th>E-mail</th>
						</tr>
					</thead>
					<tbody>
						{personsList}
					</tbody>
				</table>
			</div>
		)
	}
}

export default connect((state) => {
	return {
		persons: state[personModule]
	}
})(PersonsList)