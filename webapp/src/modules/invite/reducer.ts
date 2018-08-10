import { loadingReducer, LoadingState } from '@dapps/modules/loading/reducer'
import {
  FETCH_INVITES_REQUEST,
  FETCH_INVITES_SUCCESS,
  FETCH_INVITES_FAILURE,
  FetchInvitesSuccessAction,
  FetchInvitesFailureAction,
  FetchInvitesRequestAction
} from './actions'

export type InviteState = {
  loading: LoadingState
  data: {
    [address: string]: number
  }
  error: null | string
}

export type InviteReducerAction =
  | FetchInvitesRequestAction
  | FetchInvitesSuccessAction
  | FetchInvitesFailureAction

export const InviteInitialState: InviteState = {
  loading: [],
  data: {},
  error: null
}

export function invitesReducer(
  state: InviteState = InviteInitialState,
  action: InviteReducerAction
): InviteState {
  switch (action.type) {
    case FETCH_INVITES_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case FETCH_INVITES_SUCCESS: {
      return {
        loading: loadingReducer(state.loading, action),
        data: {
          ...state.data,
          [action.payload.address]: action.payload.amount
        },
        error: null
      }
    }
    case FETCH_INVITES_FAILURE: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.payload.errorMessage
      }
    }
    default: {
      return state
    }
  }
}
