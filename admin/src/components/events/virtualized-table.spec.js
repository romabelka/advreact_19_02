import React from 'react'
import { shallow, render, mount } from 'enzyme'
import { EventsTableVirtualized } from './virtualized-table'
import Loader from '../common/Loader'
import mockEvents from '../../mocks/conferences'

const events = mockEvents.map(event => ({ ...event, uid: Math.random().toString() }))

describe('EventsTable Component', () => {
    it('should show loader', () => {
        const wrapper = shallow(<EventsTableVirtualized
            loading/>, { disableLifecycleMethods: true })

        expect(wrapper.contains(<Loader/>)).toBe(true)
    })

    it('should render events', () => {
        const wrapper = render(<EventsTableVirtualized
            events={events}/>, { disableLifecycleMethods: true })
        const rowsNumber = 10
        expect(wrapper.find('.test__virtualized-table--item').length)
            .toBe(events.length < rowsNumber ? events.length : rowsNumber)
    })

    it('should fetch group of events', (done) => {
        const fetchEvents = () => done()
        shallow(<EventsTableVirtualized events={{}} fetchSomeEvents={fetchEvents}/>)
    })

    it('should select an event', () => {
        let selected = null
        const selectEvent = uid => selected = uid
        const wrapper = mount(
            <EventsTableVirtualized
                events={events}
                selectEvent={selectEvent}
                fetchSomeEvents={() => ({})}/>,
            { disableLifecycleMethods: true },
        )

        wrapper.find('.test__virtualized-table--item').at(1).simulate('click')

        expect(selected).toBe(events[0].uid)
    })

})
