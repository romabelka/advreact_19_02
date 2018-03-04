import React from 'react'
import {shallow, mount} from 'enzyme'
import {EventsTableVirtualized} from './virtualized-table'
import Loader from '../common/Loader'
import mockEvents from '../../mocks/conferences'
import {Table, Column, InfiniteLoader} from 'react-virtualized'

const events = mockEvents.map(event => ({...event, uid: Math.random().toString()}))

describe('EventsTableVirtualized Component', () => {
    it('should show loader', () => {
        const wrapper = shallow(<EventsTableVirtualized loading />, { disableLifecycleMethods: true })

        expect(wrapper.contains(<Loader />)).toBe(true)
    });

    it('should contain InfifniteLoader with valid props', () => {
        const props = {
            events,
            eventsCount: events.length,
            selectEvent: () => {},
            fetchRows: () => {}
        }
        const wrapper = shallow(<EventsTableVirtualized {...props} />)

        const loaderProps = wrapper.find(InfiniteLoader).props()
        const {isRowLoaded, rowCount} = loaderProps
        
        expect(wrapper.find(InfiniteLoader).length).toBe(1)
        expect(isRowLoaded({index: rowCount})).toBe(false)
        expect(isRowLoaded({index: rowCount - 1})).toBe(true)
        expect(rowCount).toBe(events.length)
    });

    it('should fetch rows when loadMoreRows handler called', () => {
        const props = {
            events,
            eventsCount: events.length,
            selectEvent: () => {},
            fetchRows: jest.fn()
        }
        const testIndex = 10
        const wrapper = shallow(<EventsTableVirtualized {...props} />, { disableLifecycleMethods: true })

        const loadMoreRows = wrapper.find(InfiniteLoader).props().loadMoreRows

        loadMoreRows({startIndex: testIndex})
        const uid = events[testIndex - 1].uid

        expect(props.fetchRows).toHaveBeenCalledTimes(1)
        expect(props.fetchRows).toHaveBeenCalledWith(uid)
    });

    it('should fetch when component loads', (done) => {
        const fetchEvents = () => done()
        shallow(<EventsTableVirtualized events = {[]} fetchRows = {fetchEvents}/>)
    }, 1000);

    it('should select an event', () => {
        let selected = null
        const selectEvent = uid => selected = uid

        const props = {
            events,
            eventsCount: events.length,
            selectEvent,
            fetchRows: () => {}
        }

        const wrapper = mount (<EventsTableVirtualized { ...props }/>)

        wrapper.find('div.ReactVirtualized__Table__row').first().simulate('click')

        expect(selected).toBe(events[0].uid)
    });
});