import { loadingReducer } from '@dapps/modules/loading/reducer'
import {
  FETCH_INVITES_REQUEST,
  FETCH_INVITES_SUCCESS,
  FETCH_INVITES_FAILURE,
  FetchInvitesRequest,
  FetchInvitesSuccess,
  FetchInvitesFailure,
  InviteState
} from './types'

const INITIAL_STATE: InviteState = {
  loading: [],
  data: {},
  error: null
}

export function invitesReducer(
  state: InviteState = INITIAL_STATE,
  action: FetchInvitesRequest | FetchInvitesSuccess | FetchInvitesFailure
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
