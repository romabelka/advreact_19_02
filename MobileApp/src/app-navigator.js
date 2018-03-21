import { StackNavigator, TabNavigator } from 'react-navigation'
import SignIn from './components/screens/sign-in'
import Event from './components/screens/event'
import EventList from './components/screens/event-list'
import People from './components/screens/people'

const EventsStack = StackNavigator({
    eventsList: {
        screen: EventList
    },
    event: {
        screen: Event
    }
})

const EventsAndPeopleTabs = TabNavigator({
    people: {
        screen: People
    },
    events: {
        screen: EventsStack
    }
})

const AppNavigator = StackNavigator({
    signIn: {
        screen: SignIn
    },
    eventsAndPeople: {
        screen: EventsAndPeopleTabs
    }
})

export default AppNavigator