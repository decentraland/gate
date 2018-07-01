import { eth } from 'decentraland-eth'
import { select, call, put } from 'redux-saga/effects'

import { getAddress } from 'modules/wallet/selectors'
import { setBalance, balanceError } from 'modules/balance/actions'
import { LOAD_BALANCE } from 'modules/balance/types'

export function* balanceSaga() {
  yield takeEvery(LOAD_BALANCE, handleLoadBalance)
}

function* handleLoadBalance(action) {
  try {
    const contract = eth.getContract('DecentralandInvite')
    const address = yield select(getAddress)
    const balance = yield call(() => contract.balance(address))

    yield put(setBalance(balance))
  } catch (error) {
    yield put(balanceError(error))
  }
}
