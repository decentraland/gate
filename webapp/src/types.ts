import { MiddlewareAPI, AnyAction, Store } from 'redux'
import { RouterState } from 'react-router-redux'
import { WalletState } from '@dapps/modules/wallet/types'
import { InviteState } from './modules/invite/reducer'

export type RootState = {
  router: RouterState
  wallet: WalletState
  invite: InviteState
}

export type RootStore = Store<RootState>

export interface RootDispatch<A = AnyAction> {
  (action: A): A
}

export type RootMiddleware = (
  store: MiddlewareAPI<any>
) => (next: RootDispatch<AnyAction>) => (action: AnyAction) => any
