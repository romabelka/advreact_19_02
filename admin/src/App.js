import React, { Component } from 'react'
import AdminRoute from './components/routes/admin'
import AuthRoute from './components/routes/auth'
import CustomerRoute from './components/routes/customer'
import {Route} from 'react-router-dom'
import ProtectedRoute from './components/common/ProtectedRoute'

class App extends Component {
    render() {
        return (
            <div>
                <Route path='/auth' component={AuthRoute}/>
                <ProtectedRoute path='/admin' component={AdminRoute}/>
                <ProtectedRoute path='/customers' component={CustomerRoute} />
            </div>
        )
    }
}

export default App