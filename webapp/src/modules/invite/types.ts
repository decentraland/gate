import { AnyAction } from 'redux'
import * as actions from './actions'

// Actions

export const FETCH_INVITES_REQUEST = '[Request] Fetch Invites'
export const FETCH_INVITES_SUCCESS = '[Success] Fetch Invites'
export const FETCH_INVITES_FAILURE = '[Failure] Fetch Invites'

export type FetchInvitesRequest = ReturnType<typeof actions.fetchInvitesRequest>
export type FetchInvitesSuccess = ReturnType<typeof actions.fetchInvitesSuccess>
export type FetchInvitesFailure = ReturnType<typeof actions.fetchInvitesFailure>

export const SEND_INVITE_REQUEST = '[Request] Send Invite'
export const SEND_INVITE_SUCCESS = '[Success] Send Invite'
export const SEND_INVITE_FAILURE = '[Failure] Send Invite'

export type SendInvitesRequest = ReturnType<typeof actions.sendInvitesRequest>
export type SendInvitesSuccess = ReturnType<typeof actions.sendInvitesSuccess>
export type SendInvitesFailure = ReturnType<typeof actions.sendInvitesFailure>

// State

export type InviteState = {
  loading: AnyAction[]
  data: {
    [address: string]: number
  }
  error: null | string
}
