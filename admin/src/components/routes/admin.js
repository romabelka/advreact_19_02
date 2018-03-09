import React, { Component } from 'react'
import SelectedEvents from '../events/selected-events'
import LazyEvents from '../events/virtualized-lazy-table'
import PeopleList from '../people/people-list'
import RecycleBinDropTarget from './../../components/common/recycle-bin-drop-target'

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
                <RecycleBinDropTarget />
            </div>
        )
    }
}

export default AdminRoute