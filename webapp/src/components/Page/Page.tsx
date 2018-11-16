import * as React from 'react'

import { Container, NavbarProps } from 'decentraland-ui'
import { Navbar, Footer } from '@dapps/containers'

import './Page.css'

export default class Page extends React.PureComponent<NavbarProps> {
  render() {
    const { children, isSignIn, onSignIn } = this.props

    return (
      <>
        <Navbar isSignIn={isSignIn} onSignIn={onSignIn} />
        <div className="Page">
          <Container>{children}</Container>
        </div>
        <Footer locales={['en']} />
      </>
    )
  }
}
