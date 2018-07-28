import * as React from 'react'
import {
  Header,
  Segment,
  Button,
  Field,
  Table,
  Blockie,
  Address
} from 'decentraland-ui'
import { eth } from 'decentraland-eth'
import EtherscanLink from '@dapps/containers/EtherscanLink'
import { Transaction } from '@dapps/modules/transaction/types'

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

  handleInvite = () => {
    const { address } = this.state
    const { onInvite } = this.props
    onInvite(address)
  }

  isEmpty() {
    return this.state.address.length === 0
  }

  isValid() {
    const { address } = this.state
    return !address || eth.utils.isValidAddress(address)
  }

  getError() {
    let message
    let error
    if (this.isEmpty()) {
      message = 'Enter an Ethereum address'
    } else if (!this.isValid()) {
      message = 'That is not a valid Ethereum address'
      error = true
    }

    return { message, error }
  }

  render() {
    const {
      invites,
      pendingTransactions,
      transactionHistory,
      totalSent
    } = this.props
    const transations = [...pendingTransactions, ...transactionHistory]
    const { message, error } = this.getError()
    return (
      <div className="HomePage">
        <Header size="huge">Gate</Header>
        <Header sub>
          Management service to onboard new users to the Decentraland Alpha
        </Header>
        <Segment>
          <div className="header">
            <Header>Invite new user</Header>
            <Button basic>{invites} Invites Left</Button>
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
          <div className="button-wrapper">
            <Button
              primary
              disabled={this.isEmpty() || error || invites === 0}
              onClick={this.handleInvite}
            >
              Invite
            </Button>
            {invites === 0 ? (
              <span className="message">
                You don&apos;t have any invites left
              </span>
            ) : null}
          </div>
        </Segment>

        {totalSent > 0 ? (
          <>
            <Header>Invites History ({totalSent})</Header>
            <Table basic>
              <Table.Header>
                <Table.HeaderCell>Address</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Header>
              <Table.Body>
                {transations.map((transaction: Transaction) => (
                  <Table.Row>
                    <Table.Cell className="address">
                      <Blockie
                        seed={(transaction as any).payload.address}
                        scale={3}
                      />
                      <Address
                        shorten={false}
                        value={(transaction as any).payload.address}
                      />
                    </Table.Cell>
                    <Table.Cell className="status">
                      <EtherscanLink txHash={transaction.hash}>
                        {transaction.status}{' '}
                      </EtherscanLink>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </>
        ) : null}
      </div>
    )
  }
}
