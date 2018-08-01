import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import { RootState } from 'types'
import { walletReducer as wallet } from '@dapps/modules/wallet/reducer'
import { translationReducer as translation } from '@dapps/modules/translation/reducer'
import {
  storageReducer as storage,
  storageReducerWrapper
} from '@dapps/modules/storage/reducer'
import { transactionReducer as transaction } from '@dapps/modules/transaction/reducer'
import { invitesReducer as invite } from 'modules/invite/reducer'

// TODO: Consider spliting individual reducers into { data, loading, error }
export const rootReducer = storageReducerWrapper(
  combineReducers<RootState>({
    router,
    wallet,
    translation,
    storage,
    transaction,
    invite
  })
)
