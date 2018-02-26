import React, { Component } from 'react'
import AdminRoute from './components/routes/admin'
import AuthRoute from './components/routes/auth'
import ClientRoute from './components/routes/client'
import {Route} from 'react-router-dom'
import ProtectedRoute from './components/common/ProtectedRoute'

class App extends Component {
    render() {
        return (
            <div>
                <Route path='/auth' component={AuthRoute}/>
                <Route path='/clients' component={ClientRoute}/>
                <ProtectedRoute path='/admin' component={AdminRoute}/>
            </div>
        )
    }
}

export default App