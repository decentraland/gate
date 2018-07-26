export const PENDING_INVITES_REQUEST = '[Request] Pending Invites'
export const PENDING_INVITES_SUCCESS = '[Success] Pending Invites'
export const PENDING_INVITES_FAILURE = '[Failure] Pending Invites'

export function pendingInvitesRequest(address: string) {
  return {
    type: PENDING_INVITES_REQUEST,
    address
  }
}

export function pendingInvitesSuccess(address: string, amount: number) {
  return {
    type: PENDING_INVITES_SUCCESS,
    address,
    amount
  }
}

export function pendingInvitesFailure(address: string, errorMessage: string) {
  return {
    type: PENDING_INVITES_FAILURE,
    address,
    errorMessage
  }
}
