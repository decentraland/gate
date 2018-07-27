import { connect } from 'react-redux'
import { RootState } from 'types'
import { getAddress } from '@dapps/modules/wallet/selectors'
import {
  getPendingTransactions,
  getTransactionHistory
} from '@dapps/modules/transaction/selectors'
import { getInvites } from 'modules/invite/selectors'
import HomePage from './HomePage'
import { HomePageProps } from './types'
import { Dispatch, AnyAction } from 'redux'
import { sendInvitesRequest } from 'modules/invite/actions'

const mapState = (state: RootState): Partial<HomePageProps> => {
  const address = getAddress(state)
  const invites = getInvites(state, address)

  const pendingTransactions = address
    ? getPendingTransactions(state, address).reverse()
    : []
  const transactionHistory = address
    ? getTransactionHistory(state, address).reverse()
    : []

  const totalSent = pendingTransactions.length + transactionHistory.length

  return {
    invites,
    pendingTransactions,
    transactionHistory,
    totalSent
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
