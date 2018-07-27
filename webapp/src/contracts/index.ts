import { contracts } from 'decentraland-eth'
import { env } from 'decentraland-commons'
import { DecentralandInvite } from './DecentralandInvite'

const manaToken = new contracts.MANAToken(
  env.get('REACT_APP_MANA_TOKEN_CONTRACT_ADDRESS')
)

const invite = new DecentralandInvite(
  env.get('REACT_APP_DECENTRALAND_INVITE_CONTRACT_ADDRESS')
) as any

export { manaToken, invite }
