import { Transaction } from '@dapps/modules/transaction/types'

export interface HomePageProps {
  invites: number
  pendingTransactions: Transaction[]
  transactionHistory: Transaction[]
  totalSent: number
  onInvite: (address: string) => void
}
export interface HomePageState {
  address: string
}
