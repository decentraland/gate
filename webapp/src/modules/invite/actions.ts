import { action } from 'typesafe-actions'
import { buildTransactionPayload } from '@dapps/modules/transaction/utils'

// Fetch Invites

export const FETCH_INVITES_REQUEST = '[Request] Fetch Invites'
export const FETCH_INVITES_SUCCESS = '[Success] Fetch Invites'
export const FETCH_INVITES_FAILURE = '[Failure] Fetch Invites'

export const fetchInvitesRequest = (address: string) =>
  action(FETCH_INVITES_REQUEST, {
    address
  })

export const fetchInvitesSuccess = (address: string, amount: number) =>
  action(FETCH_INVITES_SUCCESS, {
    address,
    amount
  })

export const fetchInvitesFailure = (address: string, errorMessage: string) =>
  action(FETCH_INVITES_FAILURE, {
    address,
    errorMessage
  })

export type FetchInvitesRequestAction = ReturnType<typeof fetchInvitesRequest>
export type FetchInvitesSuccessAction = ReturnType<typeof fetchInvitesSuccess>
export type FetchInvitesFailureAction = ReturnType<typeof fetchInvitesFailure>

// Send Invite

export const SEND_INVITE_REQUEST = '[Request] Send Invite'
export const SEND_INVITE_SUCCESS = '[Success] Send Invite'
export const SEND_INVITE_FAILURE = '[Failure] Send Invite'

export const sendInvitesRequest = (address: string) =>
  action(SEND_INVITE_REQUEST, {
    address
  })

export const sendInvitesSuccess = (txHash: string, address: string) =>
  action(SEND_INVITE_SUCCESS, {
    ...buildTransactionPayload(txHash, {
      address
    }),
    address
  })

export const sendInvitesFailure = (address: string, errorMessage: string) =>
  action(SEND_INVITE_FAILURE, {
    address,
    errorMessage
  })

export type SendInvitesRequestAction = ReturnType<typeof sendInvitesRequest>
export type SendInvitesSuccessAction = ReturnType<typeof sendInvitesSuccess>
export type SendInvitesFailureAction = ReturnType<typeof sendInvitesFailure>
