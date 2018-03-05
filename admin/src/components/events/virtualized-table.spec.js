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


    it('should ask for new events', (done) => {
        const dummy = () => done();
        shallow(<EventsTableVirtualized fetchNextEvents={dummy}/>)
    });

    it('should render events', () => {

        const fetchNextEvents = (count) => events.slice(0, count)
        const wrapper = shallow(<EventsTableVirtualized events={events} fetchNextEvents={fetchNextEvents} loading={false} />)
        expect(wrapper.find('.ReactVirtualized__Table__rowColumn').length).toBeGreaterThan(0)

    });
});