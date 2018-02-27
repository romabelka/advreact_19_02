import React, { Component } from 'react'
import AdminRoute from './components/routes/admin'
import AuthRoute from './components/routes/auth'
import {Route} from 'react-router-dom'
import ProtectedRoute from './components/common/ProtectedRoute'
import PersonPage from './components/routes/person-page'

export const PeopleRoute = '/people'

class App extends Component {
    render() {
        return (
            <div>
                <Route path='/auth' component={AuthRoute}/>
                <ProtectedRoute path='/admin' component={AdminRoute}/>
                <ProtectedRoute path={PeopleRoute} component={PersonPage}/>
            </div>
        )
    }
}

export default App