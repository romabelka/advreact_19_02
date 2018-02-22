import React, { Component } from 'react'
import AdminRoute from './components/routes/admin'
import {Route} from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <div>
                <Route path='/admin' component={AdminRoute}/>
            </div>
        )
    }
}

export default App