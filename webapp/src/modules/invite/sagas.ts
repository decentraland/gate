import { takeLatest, put, call } from 'redux-saga/effects'
import {
  CONNECT_WALLET_SUCCESS,
  ConnectWalletSuccess
} from '@dapps/modules/wallet/types'
import {
  FETCH_INVITES_REQUEST,
  SEND_INVITE_REQUEST,
  FetchInvitesRequest,
  SendInvitesRequest,
  fetchInvitesRequest,
  fetchInvitesSuccess,
  fetchInvitesFailure,
  sendInvitesSuccess,
  sendInvitesFailure
} from './actions'
import { invite } from 'contracts'

export function* inviteSaga() {
  yield takeLatest(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
  yield takeLatest(FETCH_INVITES_REQUEST, handleFetchInvitesRequest)
  yield takeLatest(SEND_INVITE_REQUEST, handleSendInviteRequest)
}

function* handleConnectWalletSuccess(action: ConnectWalletSuccess) {
  yield put(fetchInvitesRequest(action.payload.wallet.address))
}

function* handleFetchInvitesRequest(action: FetchInvitesRequest) {
  try {
    const amount = yield call(() => invite.balance(action.payload.address))
    yield put(fetchInvitesSuccess(action.payload.address, amount.toNumber()))
  } catch (error) {
    yield put(fetchInvitesFailure(action.payload.address, error.message))
  }
}

function* handleSendInviteRequest(action: SendInvitesRequest) {
  try {
    const txHash = yield call(() =>
      invite.invite(action.payload.address, 'sabe')
    )

    yield put(sendInvitesSuccess(txHash, action.payload.address))
  } catch (error) {
    yield put(sendInvitesFailure(action.payload.address, error.message))
  }
}
