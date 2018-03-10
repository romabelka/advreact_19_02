import React, { Component } from 'react'
import {connect} from 'react-redux'
import {
    loadingSelector, loadedSelector, fetchLazy, selectEvent, eventListSelector
} from '../../ducks/events'
import {Table, Column, InfiniteLoader} from 'react-virtualized'
import 'react-virtualized/styles.css'
import EventLazyTableRow from "./virtualized-lazy-table-row";

export class EventLazyTable extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.fetchLazy()
    }

    render() {
        const {loaded, events} = this.props
        return (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                rowCount={loaded ? events.length : events.length + 1}
                loadMoreRows={this.loadMoreRows}
            >
                {({onRowsRendered, registerChild}) =>
                    <Table
                        ref={registerChild}
                        rowCount={events.length}
                        rowGetter={this.rowGetter}
                        rowHeight={40}
                        headerHeight={50}
                        overscanRowCount={1}
                        width={700}
                        height={300}
                        onRowClick={this.handleRowClick}
                        onRowsRendered={onRowsRendered}
                        rowRenderer={this.rowRenderer.bind(this)}
                        rowClassName="test__event_table_row"
                    >
                        <Column
                            label="title"
                            dataKey="title"
                            width={300}
                        />
                        <Column
                            label="where"
                            dataKey="where"
                            width={250}
                        />
                        <Column
                            label="when"
                            dataKey="month"
                            width={150}
                        />
                    </Table>
                }
            </InfiniteLoader>
        )
    }

    isRowLoaded = ({ index }) => index < this.props.events.length

    loadMoreRows = () => {
        this.props.fetchLazy()
    }

    rowGetter = ({ index }) => {
        return this.props.events[index]
    }

	rowRenderer(props) {
        return (
            <div key={ props.rowData.uid }>
                <EventLazyTableRow rowParams={ props } event={ props.rowData } />
            </div>
        )

    }

    handleRowClick = ({rowData}) => {
        const {selectEvent} = this.props
        selectEvent && selectEvent(rowData.uid)
    }
}



export default connect(state => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
}), {fetchLazy, selectEvent})(EventLazyTable)