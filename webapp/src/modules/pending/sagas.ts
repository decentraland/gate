import { AnyAction } from 'redux'
import { takeLatest, put, call } from 'redux-saga/effects'
import {
  CONNECT_WALLET_SUCCESS,
  ConnectWalletSuccess
} from '@dapps/modules/wallet/types'
import {
  PENDING_INVITES_REQUEST,
  pendingInvitesRequest,
  pendingInvitesSuccess,
  pendingInvitesFailure
} from 'modules/pending/actions'
import { invite } from 'contracts'

export function* pendingSaga() {
  yield takeLatest(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
  yield takeLatest(PENDING_INVITES_REQUEST, handlePendingInvitesRequest)
}

function* handleConnectWalletSuccess(action: ConnectWalletSuccess) {
  yield put(pendingInvitesRequest(action.payload.wallet.address))
}
function* handlePendingInvitesRequest(action: AnyAction) {
  try {
    const amount = yield call(() => invite.balance(action.address))
    yield put(pendingInvitesSuccess(action.address, amount))
  } catch (error) {
    yield put(pendingInvitesFailure(action.address, error.message))
  }
}
