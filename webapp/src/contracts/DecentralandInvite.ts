import { Contract } from 'decentraland-eth'
import { fulfillContractMethods } from 'decentraland-eth/dist/contracts/verification'
const { abi } = require('./artifacts/truffle/DecentralandInvite.json')

export class DecentralandInvite extends Contract {
  constructor(address: string) {
    super(address, abi)
    fulfillContractMethods(this, abi)
  }
  getContractName() {
    return 'DecentralandInvite'
  }
}
