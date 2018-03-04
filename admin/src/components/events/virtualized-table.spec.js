import React from 'react'
import {mount} from 'enzyme'
import {EventsTableVirtualized} from './virtualized-table'
import mockEvents from '../../mocks/conferences'

const events = mockEvents.map(event => ({...event, uid: Math.random().toString()}))

describe('EventsTableVirtualized Component', () => {
	it('should render rows', () => {
		const fn = () => null;

		const wrapper = mount(
			<EventsTableVirtualized fetchRangeOfEvents={fn} events={events} />,
			{ disableLifecycleMethods: true }
		)

		expect(wrapper.find('.ReactVirtualized__Table__row').length).toBe(9)
	})

	it('should call for more events', (done) => {
		const fn = () => done()

		mount(<EventsTableVirtualized fetchRangeOfEvents={fn} events={events} />)
	})

	it('should select a row on click', () => {
		let selected = null;
		const selectEvent = uid => selected = uid;

		const wrapper = mount(
			<EventsTableVirtualized
				selectEvent={selectEvent}
				fetchRangeOfEvents={() => {}}
				events={events} />
		)

		wrapper.find('.ReactVirtualized__Table__row').first().simulate('click')

		expect(selected).toBe(events[0].uid)
	})
})
