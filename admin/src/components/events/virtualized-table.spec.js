import React from 'react'
import {shallow} from 'enzyme'
import {EventsTableVirtualized} from './virtualized-table'
import Loader from '../common/Loader'
import mockEvents from '../../mocks/conferences'

const events = mockEvents.map(event => ({...event, uid: Math.random().toString()}))

describe('EventsTableVirtualized Component', () => {
    it('should show loader', () => {
        const wrapper = shallow(<EventsTableVirtualized loading />, { disableLifecycleMethods: true })

        expect(wrapper.contains(<Loader />)).toBe(true)
    });

    it('should ask for new events if necessary', (done) => {
        const dummy = () => done();
        shallow(<EventsTableVirtualized events={[]}  fetchNextEvents={dummy}/>, { disableLifecycleMethods: true })

    });

    it('should render events', () => {
        const wrapper = shallow(<EventsTableVirtualized events = {events} loading={false} />, { disableLifecycleMethods: true })

        expect(wrapper.find('.ReactVirtualized__Table__row').length).toBe(events.length)

    });
    /*
    it('should fetch all events', (done) => {
        const fetchEvents = () => done()
        shallow(<EventsTable events = {[]} fetchAllEvents = {fetchEvents}/>)
    });

    it('should select an event', () => {
        let selected = null
        const selectEvent = uid => selected = uid

        const wrapper = shallow(
            <EventsTable events = {events} selectEvent = {selectEvent}/>,
            { disableLifecycleMethods: true }
        )

        wrapper.find('.test__events-table--item').first().simulate('click')

        expect(selected).toBe(events[0].uid)
    });*/
});