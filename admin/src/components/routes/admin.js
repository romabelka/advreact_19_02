import React, { Component } from 'react'
import SelectedEvents from '../events/selected-events'
import LazyEvents from '../events/virtualized-lazy-table'
import PeopleList from '../people/people-list'
import TrashBin from "../common/trash";

class AdminRoute extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h1>Admin route</h1>
                <PeopleList/>
                <SelectedEvents/>
                <LazyEvents/>
                <TrashBin/>
            </div>
        )
    }
}

export default AdminRoute