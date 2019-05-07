const defaultGasPrice = 5e9
const defaultGasLimit = 4e5

const contractName = 'DecentralandInvite'

function getContractAt(name) {
  const contracts = config.contracts[buidlerArguments.network];

  if (contracts === undefined) {
    console.error("There are no deployed contracts in the network", buidlerArguments.network);
    process.exit(1)
  }

  const address = config.contracts[buidlerArguments.network][name]
  const contract = artifacts.require(name)
  return contract.at(address)
}

function injectGasParams(fn) {
  return function({ gaslimit, gasprice, ...params }) {
    params.gasParams = {
      gas: gaslimit || defaultGasLimit,
      gasPrice: gasprice || defaultGasPrice
    }
    return fn(params)
  }
}

function buildTaskWithGas(name, description) {
  return task(name, description)
    .addOptionalParam('gasprice', 'Gas price for the transaction')
    .addOptionalParam('gaslimit', 'Gas limit for the transaction')
}

task('check', 'Check if address is invited')
  .addPositionalParam('address', 'Address of an invited user')
  .setAction(async ({ address }) => {
    const contract = getContractAt(contractName)

    const balance = await contract.balanceOf(address)
    console.log(`Address ${address} has ${balance.toNumber()} invite tickets`)
  })

buildTaskWithGas('allow', 'Give invites to an address')
  .addPositionalParam('address', 'Address to receive the invites')
  .addPositionalParam('count', 'Number of invites to give')
  .setAction(
    injectGasParams(async ({ address, count, gasParams }) => {
      const contract = getContractAt(contractName)
      const response = await contract.allow(address, count, gasParams)
      console.log(response)
    })
  )

buildTaskWithGas('invite', 'Invite address')
  .addPositionalParam('address', 'Address of an user to invite')
  .setAction(
    injectGasParams(async ({ address, gasParams }) => {
      const contract = getContractAt(contractName)
      await contract.invite(address, '', gasParams)
      console.log(`Address ${address} has been invited`)
    })
  )

task('get-owner', 'Check owner address of the contract').setAction(async () => {
  const contract = getContractAt(contractName)

  const owner = await contract.owner()
  console.log(`Address ${owner} is the contract owner`)
})

buildTaskWithGas(
  'transfer-ownership',
  'Transfer ownership of the contract to new owner'
)
  .addPositionalParam('address', 'Address of the new owner')
  .setAction(
    injectGasParams(async ({ address, gasParams }) => {
      const contract = getContractAt(contractName)
      await contract.transferOwnership(address, gasParams)
      console.log(`Address ${address} set as new owner`)
    })
  )
