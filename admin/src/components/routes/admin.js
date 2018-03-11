import React, { Component } from 'react'
import SelectedEvents from '../events/selected-events'
import LazyEvents from '../events/virtualized-lazy-table'
import PeopleList from '../people/people-list'
import TrashCan from '../common/trash-can'

class AdminRoute extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h1>Admin route</h1>
                <div style = {{display: 'flex'}}>
                    <div>
                        <PeopleList/>
                        <SelectedEvents/>
                    </div>
                    <TrashCan/>
                </div>
                <LazyEvents/>
            </div>
        )
    }
}

export default AdminRoute