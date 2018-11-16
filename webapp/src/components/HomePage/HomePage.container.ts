import { Dispatch, AnyAction } from 'redux'
import { connect } from 'react-redux'

import { getAddress } from '@dapps/modules/wallet/selectors'
import { getTransactions } from '@dapps/modules/transaction/selectors'

import { RootState } from 'types'
import { getInvites } from 'modules/invite/selectors'
import { sendInvitesRequest } from 'modules/invite/actions'
import HomePage from './HomePage'
import { HomePageProps } from './Homepage.types'

const mapState = (state: RootState): Partial<HomePageProps> => {
  const address = getAddress(state)
  const invites = getInvites(state, address)

  const transactions = address ? getTransactions(state, address) : []

  return {
    invites,
    transactions,
    totalSent: transactions.length
  }
}

const mapDispatch = (
  dispatch: Dispatch<AnyAction>
): Partial<HomePageProps> => ({
  onInvite: (address: string) => dispatch(sendInvitesRequest(address))
})

export default connect<any>(
  mapState,
  mapDispatch
)(HomePage)
