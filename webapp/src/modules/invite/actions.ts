import { action } from 'typesafe-actions'
import { buildTransactionPayload } from '@dapps/modules/transaction/utils'
import {
  FETCH_INVITES_REQUEST,
  FETCH_INVITES_SUCCESS,
  FETCH_INVITES_FAILURE,
  SEND_INVITE_REQUEST,
  SEND_INVITE_SUCCESS,
  SEND_INVITE_FAILURE
} from './types'

// Fetch Invites

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

// Send Invite

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
