import { RootState } from 'types'

export const getState = (state: RootState) => state.pending
export const getData = (state: RootState) => getState(state).data
export const getLoading = (state: RootState) => getState(state).loading
export const getError = (state: RootState) => getState(state).error
