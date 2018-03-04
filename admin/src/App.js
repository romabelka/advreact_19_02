import React, { Component } from 'react'
import AdminRoute from './components/routes/admin'
import AuthRoute from './components/routes/auth'
import {Route, NavLink} from 'react-router-dom'
import ProtectedRoute from './components/common/ProtectedRoute'
import PersonPage from './components/routes/person-page'
import EventsPage from './components/routes/events-page'

class App extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><NavLink to = '/admin' activeStyle = {{color: 'red'}}>admin</NavLink></li>
                    <li><NavLink to = '/people' activeStyle = {{color: 'red'}}>people</NavLink></li>
                    <li><NavLink to = '/events' activeStyle = {{color: 'red'}}>events</NavLink></li>
                </ul>
                <Route path='/auth' component={AuthRoute}/>
                <Route path='/clients' component={ClientRoute}/>
                <ProtectedRoute path='/admin' component={AdminRoute}/>
                <ProtectedRoute path="/people" component={PersonPage}/>
                <ProtectedRoute path="/events" component={EventsPage}/>
            </div>
        )
    }
}

export default App