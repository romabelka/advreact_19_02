import React, {Component} from 'react'
import {connect} from 'react-redux'
import EmployeeForm from '../../employees/employee-form'
import {createEmployee,} from '../../../ducks/employees'

class EmployeeRoute extends Component {
    static propTypes = {};

    render() {
        return (
            <div>
                <EmployeeForm onSubmit = {this.handleCreateEmployee}/>
            </div>
        )
    }

    handleCreateEmployee = ({ firstName, lastName }) => this.props.createEmployee(firstName, lastName)
}

export default connect(null, { createEmployee, })(EmployeeRoute)