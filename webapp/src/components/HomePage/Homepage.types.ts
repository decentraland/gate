import { Transaction } from '@dapps/modules/transaction/types'

export type HomePageProps = {
  invites: number
  transactions: Transaction[]
  totalSent: number
  onInvite: (address: string) => void
}
export type HomePageState = {
  address: string
}
