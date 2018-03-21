import { TabNavigator } from 'react-navigation'
import EventList from './components/screens/event-list'
import People from './components/screens/people'

const MyTabNavigator = TabNavigator({
    eventList: { screen: EventList },
    people: { screen:People },
});

export default MyTabNavigator