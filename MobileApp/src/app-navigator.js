import { StackNavigator } from 'react-navigation'
import SignIn from './components/screens/sign-in'
import EventList from './components/screens/event-list'
import Event from './components/screens/event'

const AppNavigator = StackNavigator({
    signIn: {
        screen: SignIn
    },
    eventList: {
        screen: EventList
    },
    event: {
        screen: Event
    }
})

export default AppNavigator