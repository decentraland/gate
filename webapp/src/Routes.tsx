import * as React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Page from 'components/Page'
import HomePage from 'components/HomePage'
import { locations } from 'locations'

export default class Routes extends React.Component {
  renderRoutes() {
    return (
      <Switch>
        <Route exact={true} path={locations.root()} component={HomePage} />
        <Redirect to={locations.root()} />
      </Switch>
    )
  }

  render() {
    return <Page>{this.renderRoutes()} </Page>
  }
}
