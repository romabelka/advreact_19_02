import { StackNavigator, TabNavigator } from 'react-navigation'
import SignIn from './components/screens/sign-in'
import EventList from './components/screens/event-list'
import Event from './components/screens/event'
import People from './components/screens/people'

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
    tabNavigator : {
        screen: TabNavigator({
            events: {
                screen: EventList,
            },
            people: {
                screen: People,
            }
        })
    }
})

const MyTabNavigator = TabNavigator({
    eventList: { screen: EventList },
    people: { screen:People },
});

export default AppNavigator