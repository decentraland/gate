import { env } from 'decentraland-commons'
import { BaseAPI } from '@dapps/lib/api'

const URL = env.get('REACT_APP_API_URL', '')

export class API extends BaseAPI {
  // fetchSomething() {
  //   return this.request('get', '/something', {})
  // }
}

export const api = new API(URL)
