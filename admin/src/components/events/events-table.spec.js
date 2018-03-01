import React from 'react'
import {shallow} from 'enzyme'
import {EventsTable} from './events-table'
import Loader from '../common/Loader'
import mockEvents from '../../mocks/conferences'

const events = mockEvents.map(event => ({...event, uid: Math.random().toString()}))

describe('EventsTable Component', () => {
    it('should show loader', () => {
        const wrapper = shallow(<EventsTable loading />, { disableLifecycleMethods: true })

        expect(wrapper.contains(<Loader />)).toBe(true)
    });

    it('should render events', () => {
        const wrapper = shallow(<EventsTable events = {events}/>, { disableLifecycleMethods: true })

        expect(wrapper.find('.test__events-table--item').length).toBe(events.length)
    });

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
    });
});