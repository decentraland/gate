import { AnyAction } from 'redux'
import * as actions from './actions'

// Actions
export type FetchInvitesRequest = ReturnType<typeof actions.fetchInvitesRequest>
export type FetchInvitesSuccess = ReturnType<typeof actions.fetchInvitesSuccess>
export type FetchInvitesFailure = ReturnType<typeof actions.fetchInvitesFailure>

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
