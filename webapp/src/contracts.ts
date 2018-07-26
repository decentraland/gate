import { contracts /* Contract */ } from 'decentraland-eth'
import { env } from 'decentraland-commons'
// import { fulfillContractMethods } from 'decentraland-eth/dist/contracts/verification'
// const { abi } = require('./artifacts/truffle/DecentralandInvite.json')

const manaToken = new contracts.MANAToken(
  env.get('REACT_APP_MANA_TOKEN_CONTRACT_ADDRESS')
)

class DecentralandInvite /* extends Contract */ {
  // constructor(address: string) {
  //   super(address, abi)
  //   fulfillContractMethods(this, abi)
  // }
  getContractName() {
    return 'DecentralandInvite'
  }
}

const invite = new DecentralandInvite() as any
/* env.get('REACT_APP_MANA_TOKEN_CONTRACT_ADDRESS'),
  abi */

export { manaToken, invite }
