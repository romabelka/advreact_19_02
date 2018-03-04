import React, { Component } from 'react'
import {connect} from 'react-redux'
import {InfiniteLoader, Table, Column} from 'react-virtualized'
import {fetchAllEvents, fetchRangeOfEvents, selectEvent, eventListSelector, loadedSelector, loadingSelector} from '../../ducks/events'
import 'react-virtualized/styles.css'

export class EventsTableVirtualized extends Component {
    static propTypes = {

    };

    isRowLoaded = ({ index }) => this.props.events[index]

    loadMoreRows = () => {
        this.props.fetchRangeOfEvents();
    }

    componentDidMount() {
        this.props.fetchRangeOfEvents()
    }

    render() {
        const {events} = this.props

        return (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={this.loadMoreRows}
                rowCount={1000}
            >
                {
                    ({ onRowsRendered, registerChild }) => (
	                    <Table
                            ref={registerChild}
                            onRowsRendered={onRowsRendered}
		                    width={600} height={500}
		                    rowCount={events.length}
		                    rowGetter={this.rowGetter}
		                    rowHeight={50}
		                    headerHeight={100}
		                    overscanRowCount={0}
                            onRowClick={({ rowData }) => this.props.selectEvent(rowData.uid)}
	                    >
		                    <Column dataKey="title" label="Event Name" width={400}/>
		                    <Column dataKey="when" label="Month" width={300}/>
		                    <Column dataKey="where" label="Place" width={300}/>
	                    </Table>
                    )
                }
            </InfiniteLoader>
        )
    }

    rowGetter = ({ index }) => this.props.events[index]
}

export default connect((state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
}), { fetchAllEvents, fetchRangeOfEvents, selectEvent })(EventsTableVirtualized)