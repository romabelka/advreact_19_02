import React, { Component } from 'react'
import { connect } from 'react-redux'
import AdminRoute from './components/routes/admin'
import { userSelector } from './ducks/auth'
import AuthRoute from './components/routes/auth'
import { Route, Redirect, Switch } from 'react-router-dom'
import ProtectedRoute from './components/common/ProtectedRoute'
import PersonPage from './components/routes/person-page'

class App extends Component {
  render() {
    console.log(`---`, this.props.isAuthorized)
    return (
      <Switch>
        <Route path="/auth" component={AuthRoute} />
        <ProtectedRoute path="/admin" component={AdminRoute} />
        <ProtectedRoute path="/people" component={PersonPage} />
        {this.props.isAuthorized ? <Redirect from="/auth" to="/people" /> : null}
      </Switch>
    )
  }
}

// export default App

export default connect(
  state => ({
    isAuthorized: userSelector(state)
  }),
  null,
  null,
  { pure: false }
)(App)
