import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Table, Column} from 'react-virtualized'
import {fetchAllEvents, selectEvent, eventListSelector, loadedSelector, loadingSelector} from '../../ducks/events'
import Loader from '../common/loader'
import 'react-virtualized/styles.css'

export class EventsTableVirtualized extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.fetchAllEvents()
    }

    render() {
        const {loading, events} = this.props
        if (loading) return <Loader />
        return (
            <Table
                width={600} height={500}
                rowCount={events.length}
                rowGetter={this.rowGetter}
                rowHeight={50}
                headerHeight={100}
                overscanRowCount={0}
            >
                <Column dataKey="title" label="Event Name" width={400}/>
                <Column dataKey="when" label="Month" width={300}/>
                <Column dataKey="where" label="Place" width={300}/>
            </Table>
        )
    }

    rowGetter = ({ index }) => this.props.events[index]
}

export default connect((state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
}), { fetchAllEvents, selectEvent })(EventsTableVirtualized)