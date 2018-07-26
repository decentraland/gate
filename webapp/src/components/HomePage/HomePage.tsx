import * as React from 'react'
import { Header } from 'decentraland-ui'
import { HomePageProps } from './types'
import './HomePage.css'

export default class HomePage extends React.PureComponent<HomePageProps> {
  render() {
    return (
      <div className="HomePage">
        <Header size="huge">Home</Header>
        <Header sub>This is just an example</Header>
      </div>
    )
  }
}
