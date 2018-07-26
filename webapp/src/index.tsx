import * as React from 'react'
import * as ReactDOM from 'react-dom'
import 'decentraland-ui/lib/styles.css'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import TranslationProvider from '@dapps/providers/TranslationProvider'
import WalletProvier from '@dapps/providers/WalletProvider'

import Routes from './Routes'
import { store, history } from './store'

import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <WalletProvier>
        <TranslationProvider locales={['en']}>
          <Routes />
        </TranslationProvider>
      </WalletProvier>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
