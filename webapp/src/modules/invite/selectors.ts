import { RootState } from 'types'

export const getState = (state: RootState) => state.invite
export const getData = (state: RootState) => getState(state).data
export const getLoading = (state: RootState) => getState(state).loading
export const getError = (state: RootState) => getState(state).error
export const getInvites = (state: RootState, address?: string) =>
  address ? getData(state)[address] : 0
