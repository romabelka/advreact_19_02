import React, { Component } from 'react'
import SelectedEvents from '../events/selected-events'
import LazyEvents from '../events/virtualized-lazy-table'
import PeopleList from '../people/people-list'
import RecycleBin from '../recycle-bin'

class AdminRoute extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <div style={{ float: 'left' }}>
                <h1>Admin route</h1>
                <PeopleList/>
                <SelectedEvents/>
                <LazyEvents/>
                </div>
                <div style={{ float: 'left' }}>
                    <div style={{ position: 'fixed' }}>
                        <RecycleBin/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminRoute
