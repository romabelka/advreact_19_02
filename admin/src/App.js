import React, { Component } from 'react'
import AdminRoute from './components/routes/admin'
import AuthRoute from './components/routes/auth'
import {Route} from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <div>
                <Route path='/auth' component={AuthRoute}/>
                <Route path='/admin' component={AdminRoute}/>
            </div>
        )
    }
}

export default App