import {computed, observable, action} from 'mobx'
import {NavigationActions} from 'react-navigation'
import AppNavigator from '../app-navigator'
import BasicStore from './basic-store'

class NavigationStore extends BasicStore {
    @observable state = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('signIn'))
    @action dispatch = (event) => {
        // Первый вариант блокирования возможности вернуться на signIn
        const { routes, index } = this.state
        if (event.type === 'Navigation/BACK'
            && index > 0 && routes[index - 1].routeName === 'signIn') {
            return null
        }
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

    // Второй вариант блокирования возможности вернуться на signIn
    replace = (routeName) => {
        const { key } = this.state.routes[this.state.index]
        this.dispatch(NavigationActions.replace({
            key,
            routeName
        }))
    }
}

export default NavigationStore
