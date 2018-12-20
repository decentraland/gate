import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import App from '@dapps/containers/App'
import SignInPage from '@dapps/containers/SignInPage'

import HomePage from 'components/HomePage'
import { locations } from 'locations'

export default class Routes extends React.Component {
  renderRoutes() {
    return (
      <Switch>
        <Route exact={true} path={locations.root()} component={HomePage} />
        <Route exact={true} path={locations.signIn()} component={SignInPage} />
        <Redirect to={locations.root()} />
      </Switch>
    )
  }

  render() {
    return <App>{this.renderRoutes()} </App>
  }
}
