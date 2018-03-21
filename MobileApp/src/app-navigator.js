import { StackNavigator, TabNavigator } from 'react-navigation'
import SignIn from './components/screens/sign-in'
import EventList from './components/screens/event-list'
import Event from './components/screens/event'
import PeopleList from './components/screens/people-list'

const AppNavigator = StackNavigator({
    signIn: {
        screen: SignIn
    },
    eventList: {
        screen: EventList
    },
    event: {
        screen: Event
    },
    tabs: {
        screen: TabNavigator({
            people: {
                screen: PeopleList,
            },
            events: {
                screen: EventList,
            },
        }),
    },
})

export default AppNavigator
