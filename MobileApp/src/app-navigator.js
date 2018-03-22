import {StackNavigator, TabNavigator} from 'react-navigation'
import EventScreen from './components/screens/event'
import EventMap from './components/screens/event-map'
import SignInScreen from './components/screens/sign-in'
import EventList from './components/screens/event-list'
import PeopleList from './components/screens/people-list'

const ListsNavigator = TabNavigator({
    events: {
        screen: EventList
    },
    people: {
        screen: PeopleList
    }
})

const AppNavigator = StackNavigator({
    auth: {
        screen: SignInScreen
    },
    lists: {
        screen: ListsNavigator
    },
    event: {
        screen: EventMap
    },
})

export default AppNavigator