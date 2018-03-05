import React, { Component } from 'react'
import {connect} from 'react-redux'
import {InfiniteLoader, Table, Column} from 'react-virtualized'
import {fetchNextEvents, selectEvent, eventListSelector, loadedSelector, loadingSelector} from '../../ducks/events'
import Loader from '../common/Loader'
import 'react-virtualized/styles.css'

export class EventsTableVirtualized extends Component {
    static propTypes = {

    };

    onLoadRowsDataSucessPromises = []

    componentDidMount() {
        this.props.fetchNextEvents(10)
    }

    componentWillUpdate(nextProps, nextState)
    {
        if (nextProps.loading === false)
        {
            this.onLoadRowsDataSucessPromises.forEach(pr => pr.resolve());
            this.onLoadRowsDataSucessPromises = [];
        }
    }


    isRowLoaded = ({index}) => {
        return !!this.props.events[index]
    }

    loadMoreRows = ({ startIndex, stopIndex }) => {
        const count = stopIndex -  this.props.events.length + 1
        if (count > 0 ) {
            //console.log('--> ' + this.props.events.length)
            this.props.fetchNextEvents(count)
            return new Promise((resolve) => this.onLoadRowsDataSucessPromises.push({resolve}))
        }
        else
            return Promise.resolve()
    }


    render() {
        const {loading, events} = this.props
        return (
            <div>
                <InfiniteLoader
                    isRowLoaded={this.isRowLoaded}
                    loadMoreRows={this.loadMoreRows}
                    rowCount={9999}
                >
                    {({ onRowsRendered, registerChild }) => (
                        <Table
                            width={600} height={500}
                            rowCount={events.length}
                            rowGetter={this.rowGetter}
                            onRowsRendered={onRowsRendered}
                            ref={registerChild}
                            rowHeight={50}
                            headerHeight={100}
                            overscanRowCount={0}
                        >
                            <Column dataKey="title" label="Event Name" width={400}/>
                            <Column dataKey="when" label="Month" width={300}/>
                            <Column dataKey="where" label="Place" width={300}/>
                        </Table>
                    )}
                </InfiniteLoader>
                {loading ?  <Loader /> : null}
            </div>
        )
    }

    rowGetter = ({ index }) => this.props.events[index]
}

export default connect((state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
}), { fetchNextEvents, selectEvent })(EventsTableVirtualized)