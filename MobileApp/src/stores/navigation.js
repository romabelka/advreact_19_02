import {computed, observable, action} from 'mobx'
import {NavigationActions} from 'react-navigation'
import AppNavigator from '../app-navigator'
import BasicStore from './basic-store'

class NavigationStore extends BasicStore {
    @observable state = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('signIn'))
    @action dispatch = (event) => {
        let _state = AppNavigator.router.getStateForAction(event, this.state)
        _state.routes = _state.routes.filter(item => item.routeName != "signIn")
        if (_state.index >= _state.routes.length )
            --_state.index;
        this.state = _state
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
}

export default NavigationStore