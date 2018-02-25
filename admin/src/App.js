import React, { Component } from 'react'
import {Route} from 'react-router-dom'

import AdminRoute from './components/routes/admin'
import AuthRoute from './components/routes/auth'
import CustomersRoute from './components/routes/customers'
import ProtectedRoute from './components/common/ProtectedRoute'

class App extends Component {
    render() {
        return (
            <div>
                <Route path='/auth' component={AuthRoute}/>
                <ProtectedRoute path='/admin' component={AdminRoute}/>
                <ProtectedRoute path='/customers' component={CustomersRoute}/>
            </div>
        )
    }
}

export default App