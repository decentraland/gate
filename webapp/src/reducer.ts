import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import { RootState } from 'types'
import { walletReducer as wallet } from '@dapps/modules/wallet/reducer'
import { translationReducer as translation } from '@dapps/modules/translation/reducer'
import { storageReducer as storage } from '@dapps/modules/storage/reducer'
import { transactionReducer as transaction } from '@dapps/modules/transaction/reducer'

// TODO: Consider spliting individual reducers into { data, loading, error }
export const rootReducer = combineReducers<RootState>({
  router,
  wallet,
  translation,
  storage,
  transaction
})
