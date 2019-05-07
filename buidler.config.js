require('@nomiclabs/buidler-truffle4')

require('./scripts/cmd')

const INFURA_API_KEY = process.env.INFURA_API_KEY
  ? process.env.INFURA_API_KEY
  : ''

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
      url: `https://mainnet.infura.io/${INFURA_API_KEY}`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : undefined,
      chainId: 1,
      gasPrice: 0x12a05f200
    },
    ropsten: {
      url: `https://ropsten.infura.io/${INFURA_API_KEY}`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : undefined,
      chainId: 3,
      gasPrice: 0x12a05f200
    },
    development: {
      host: 'localhost',
      port: 8545
    }
  },
  solc: {
    version: '0.4.24',
    evmVersion: 'homestead'
  }
}
