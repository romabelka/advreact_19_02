import { StackNavigator } from 'react-navigation'
import SignIn from './components/screens/sign-in'
import EventList from './components/screens/event-list'
import PeopleList from './components/screens/people-list'
import Event from './components/screens/event'
import Tabs from './components/screens/tabs'

const AppNavigator = StackNavigator({
    signIn: {
        screen: SignIn
    },
    eventList: {
        screen: EventList
    },
    peopleList: {
        screen: PeopleList
    },
    event: {
        screen: Event
    },
    tabs: {
        screen: Tabs
    }
})

export default AppNavigator