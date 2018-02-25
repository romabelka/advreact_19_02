import React, { Component } from 'react'
import AdminRoute from './components/routes/admin'
import AuthRoute from './components/routes/auth'
import AddUserRoute from './components/routes/addUser'
import {Route} from 'react-router-dom'
import ProtectedRoute from './components/common/ProtectedRoute'

class App extends Component {
    render() {
        return (
            <div>
                <Route path='/auth' component={AuthRoute}/>
                <ProtectedRoute path='/admin' exact component={AdminRoute}/>
				<Route path='/admin/add-user' component={AddUserRoute}/>
            </div>
        )
    }
}

export default App