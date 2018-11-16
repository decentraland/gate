import { NavbarProps } from 'decentraland-ui'

export type MapStateProps = Pick<NavbarProps, 'isSignIn'>
export type MapDispatchProps = Pick<NavbarProps, 'onSignIn'>
