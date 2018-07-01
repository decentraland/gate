import { action } from 'typesafe-actions'
import { LOAD_BALANCE } from 'modules/balance/types'

export function loadBalance() {
  return { type: LOAD_BALANCE }
}

export function setBalance(balance: number) {
  return { type: SET_BALANCE, balance }
}

export function balanceError(error: any) {
  return { type: ERROR_BALANCE, error }
}
