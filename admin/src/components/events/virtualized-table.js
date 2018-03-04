import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Table, Column, InfiniteLoader} from 'react-virtualized'
import {selectEvent, eventListSelector, loadingSelector, eventsCountSelector, fetchRows, PageSize
} from '../../ducks/events'
import Loader from '../common/Loader'
import 'react-virtualized/styles.css'

export class EventsTableVirtualized extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.fetchRows()
    }

    render() {
        const {loading, eventsCount} = this.props
        if (loading) return <Loader />

        return (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={this.loadMoreRows}
                rowCount={eventsCount}
                minimumBatchSize={PageSize}
            >
                {({onRowsRendered, registerChild}) => (
                        <Table
                            ref={registerChild}
                            width={600} height={500}
                            rowCount={eventsCount}
                            rowHeight={50}
                            headerHeight={100}
                            overscanRowCount={3}
                            onRowsRendered={onRowsRendered}
                            rowGetter={this.rowGetter}
                            onRowClick={this.onRowClick}
                        >
                            <Column dataKey="title" label="Event Name" width={400}/>
                            <Column dataKey="when" label="Month" width={300}/>
                            <Column dataKey="where" label="Place" width={300}/>
                        </Table>
                )}

            </InfiniteLoader>
        )
    }

    rowGetter = ({ index }) => {
        const row = this.props.events[index]
        return row ? row : {}
    }
    isRowLoaded = ({index}) => !!this.props.events[index]
    loadMoreRows = ({startIndex}) => {
        const row = this.rowGetter({index: startIndex - 1})
        this.props.fetchRows(row.uid)

        //Костыль :) Был ещё вариант с redux-saga-thunk
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 500);
        });
    }
    onRowClick = ({rowData}) => this.props.selectEvent(rowData.uid)
}

export default connect((state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    eventsCount: eventsCountSelector(state)
}), {selectEvent, fetchRows})(EventsTableVirtualized)