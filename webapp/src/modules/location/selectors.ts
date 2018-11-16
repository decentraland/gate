import { getPathname } from '@dapps/modules/location/selectors'

import { locations } from 'locations'
import { RootState } from 'types'

export const isSignIn = (state: RootState) => {
  const pathname = getPathname(state)
  return pathname === locations.signIn()
}
