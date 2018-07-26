import * as React from 'react'
import { Header, Segment, Button, Field } from 'decentraland-ui'
import { eth } from 'decentraland-eth'
import { HomePageProps, HomePageState } from './types'
import './HomePage.css'

export default class HomePage extends React.PureComponent<
  HomePageProps,
  HomePageState
> {
  constructor(props: HomePageProps) {
    super(props)
    this.state = {
      address: ''
    }
  }

  handleChange = (_: any, data: any) => {
    this.setState({ address: data.value })
  }

  isEmpty() {
    return this.state.address.length === 0
  }

  isValid() {
    const { address } = this.state
    return !address || eth.utils.isValidAddress(address)
  }

  getError() {
    let message, error
    if (this.isEmpty()) {
      message = 'Enter an Ethereum address'
    } else if (!this.isValid()) {
      message = "That's not a valid Ethereum address"
      error = true
    }

    return { message, error }
  }

  render() {
    const { message, error } = this.getError()
    return (
      <div className="HomePage">
        <Header size="huge">Gate</Header>
        <Header sub>
          Management service for onboarding new users to the Decentraland World
          Client
        </Header>
        <Segment>
          <div className="header">
            <Header>Invite new user</Header>
            <Button basic>6 Invites Left</Button>
          </div>
          <Field
            label="Address"
            type="address"
            value={this.state.address}
            placeholder="0x..."
            onChange={this.handleChange}
            error={error}
            message={message}
          />
          <Button primary>Invite</Button>
        </Segment>
      </div>
    )
  }
}
