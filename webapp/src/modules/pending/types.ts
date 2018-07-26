import { AnyAction } from 'redux'

export type PendingState = {
  loading: AnyAction[]
  data: {
    [address: string]: number
  }
  error: null | string
}
