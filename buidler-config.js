const HDWalletProvider = require('truffle-hdwallet-provider')
const mnemonic = '' // 12 word mnemonic

require('./scripts/cmd')

module.exports = {
  contracts: {
    mainnet: {
      DecentralandInvite: '0xf886313f213c198458eba7ae9329525e64eb763a'
    },
    ropsten: {
      DecentralandInvite: '0x7557dfa02f3bd7d274851e3f627de2ed2ff390e8'
    }
  },
  networks: {
    mainnet: {
      provider: () =>
        new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/'),
      gas: 70000000,
      network_id: '1'
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/'),
      network_id: 3, // official id of the ropsten network
      gas: 30000000
    },
    development: {
      host: 'localhost',
      port: 18545,
      gas: 100000000,
      network_id: '*' // Match any network id
    }
  }
}
