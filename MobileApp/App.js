import './src/fb-config'
import React from 'react'
import {configure} from 'mobx'
import {Provider, observer} from 'mobx-react'
import {addNavigationHelpers} from 'react-navigation'
import AppNavigator from './src/app-navigator'
import stores from './src/stores'
configure({ enforceActions: true })

@observer
export default class App extends React.Component {
    render() {
        return (
            <Provider {...stores}>
                <AppNavigator navigation = {addNavigationHelpers(stores.navigation.settings)}/>
            </Provider>
        );
    }
}

