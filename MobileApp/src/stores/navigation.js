import {computed, observable, action} from 'mobx'
import {NavigationActions} from 'react-navigation'
import AppNavigator from '../app-navigator'
import BasicStore from './basic-store'

class NavigationStore extends BasicStore {
    @observable state = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('signIn'))
    @action dispatch = (event) => {
        this.state = AppNavigator.router.getStateForAction(event, this.state)
    }

    @computed get settings() {
        return {
            dispatch: this.dispatch,
            state: this.state,
            addListener: () => {}
        }
    }

    goTo = (routeName) => {
        this.dispatch(NavigationActions.navigate({
            routeName
        }))
    }

    leaveSignIn = () => {
        const signInRouteKey = this.settings.state.routes.find(x => x.routeName === 'signIn').key

        this.dispatch(NavigationActions.replace({
            routeName: 'eventsAndPeople',
            key:  signInRouteKey
        }))
    }
}

export default NavigationStore