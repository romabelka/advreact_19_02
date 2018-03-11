import React, { Component } from 'react'
import SelectedEvents from '../events/selected-events'
import LazyEvents from '../events/virtualized-lazy-table'
import PeopleList from '../people/people-list'
import Bucket from '../Bucket'

class AdminRoute extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                <div>
                    <h1>Admin route</h1>
                    <PeopleList/>
                    <SelectedEvents/>
                    <LazyEvents/>
                </div>
                <Bucket />
            </div>
        )
    }
}

export default AdminRoute