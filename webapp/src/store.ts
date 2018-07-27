import { env } from 'decentraland-commons'
import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import createHistory from 'history/createBrowserHistory'
import createSagasMiddleware from 'redux-saga'

import { createStorageMiddleware } from '@dapps/modules/storage/middleware'
import { createTransactionMiddleware } from '@dapps/modules/transaction/middleware'

import { rootReducer } from './reducer'
import { rootSaga } from './sagas'

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const history = createHistory()

const historyMiddleware = routerMiddleware(history)
const sagasMiddleware = createSagasMiddleware()
const loggerMiddleware = createLogger({
  collapsed: () => true,
  predicate: (_: any, action) =>
    env.isDevelopment() || action.type.includes('Failure')
})
const { storageMiddleware, loadStorageMiddleware } = createStorageMiddleware(
  env.get('REACT_APP_LOCAL_STORAGE_KEY', 'decentraland-gate')
)
const transactionMiddleware = createTransactionMiddleware()

const middleware = applyMiddleware(
  storageMiddleware,
  historyMiddleware,
  sagasMiddleware,
  loggerMiddleware,
  transactionMiddleware
)
const enhancer = composeEnhancers(middleware)
const store = createStore(rootReducer, enhancer)

sagasMiddleware.run(rootSaga)
loadStorageMiddleware(store)

if (env.isDevelopment()) {
  const _window = window as any
  _window.getState = store.getState
}

export { history, store }
