import React, { Component } from 'react'
import AdminRoute from './components/routes/admin'
import AuthRoute from './components/routes/auth'
import UserRoute from './components/routes/user'

import {Route} from 'react-router-dom'
import ProtectedRoute from './components/common/ProtectedRoute'

class App extends Component {
    render() {
        return (
            <div>
                <Route path='/user' component={UserRoute}/>
                <Route path='/auth' component={AuthRoute}/>
                <ProtectedRoute path='/admin' component={AdminRoute}/>
            </div>
        )
    }
}

export default App