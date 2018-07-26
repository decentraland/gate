import { connect } from 'react-redux'
import { HomePageProps } from './types'

import HomePage from './HomePage'

const mapState = (): HomePageProps => {
  return {}
}

const mapDispatch = () => ({})

export default connect<HomePageProps>(
  mapState,
  mapDispatch
)(HomePage)
