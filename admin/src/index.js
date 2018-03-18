import './config'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import store from './redux/store'
import history from './history'
import './mocks'

ReactDOM.render(
    <Provider store = {store}>
        <ConnectedRouter history = {history}>
            <DragDropContextProvider backend = {HTML5Backend}>
                <App />
            </DragDropContextProvider>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root')
)
registerServiceWorker()
