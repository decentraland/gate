import { AnyAction } from 'redux'
import { loadingReducer } from '@dapps/modules/loading/reducer'
import {
  PENDING_INVITES_REQUEST,
  PENDING_INVITES_SUCCESS,
  PENDING_INVITES_FAILURE
} from './actions'

const INITIAL_STATE = {
  loading: [],
  data: {
    amount: 0
  },
  error: null
}

export function pendingReducer(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case PENDING_INVITES_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case PENDING_INVITES_SUCCESS: {
      return {
        loading: loadingReducer(state.loading, action),
        data: {
          ...state.data,
          [action.address]: action.amount
        },
        error: null
      }
    }
    case PENDING_INVITES_FAILURE: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.errorMessage
      }
    }
    default: {
      return state
    }
  }
}
