import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Table, Column, InfiniteLoader} from 'react-virtualized'
import {fetchSomeEvents, selectEvent, eventListSelector, loadedSelector, loadingSelector} from '../../ducks/events'
import Loader from '../common/Loader'
import 'react-virtualized/styles.css'

export class EventsTableVirtualized extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.fetchSomeEvents()
    }

    render() {
        const {loaded, loading, events} = this.props
        if (loading && !loaded) return <Loader />
        return (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={this.loadMoreRows}
                rowCount={events.length + 10}
            >
                {({ onRowsRendered, registerChild }) => (
                    <Table
                        ref = {registerChild}
                        width={600} height={500}
                        rowCount={events.length}
                        rowGetter={this.rowGetter}
                        rowHeight={50}
                        headerHeight={100}
                        rowClassName="test__virtualized-table--item"
                        overscanRowCount={0}
                        onRowsRendered={onRowsRendered}
                        onRowClick = {this.handleRowClick}
                    >
                        <Column dataKey="title" label="Event Name" width={400}/>
                        <Column dataKey="when" label="Month" width={300}/>
                        <Column dataKey="where" label="Place" width={300}/>
                    </Table>
                )}
            </InfiniteLoader>)
    }

    rowGetter = ({ index }) => this.props.events[index]

    isRowLoaded = ({ index }) => !!this.props.events[index]

    loadMoreRows = (/*{startIndex, stopIndex}*/) => {
        this.props.fetchSomeEvents(/*startIndex, stopIndex*/)
    }

    handleRowClick = ({ rowData: { uid } }) => this.props.selectEvent(uid)

}

export default connect((state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
}), { fetchSomeEvents, selectEvent })(EventsTableVirtualized)
