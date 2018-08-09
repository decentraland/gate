const defaultGasPrice = 4e9
const defaultGasLimit = 4e6

const contractName = 'DecentralandInvite'

function getContractAt(name) {
  const address = config.contracts[buidlerArguments.network][name]
  const contract = artifacts.require(name)
  return contract.at(address)
}

task('allow', 'Give invites to an address')
  .addPositionalParam('address', 'Address to receive the invites')
  .addPositionalParam('count', 'Number of invites to give')
  .addOptionalParam('gasprice', 'Gas price for the transaction')
  .setAction(async ({ address, count, gasprice }) => {
    const contract = getContractAt(contractName)

    const response = await contract.allow(address, count, {
      gas: defaultGasLimit,
      gasPrice: gasprice || defaultGasPrice
    })
    console.log(response)
    process.exit(0)
  })

task('check', 'Check if address is invited')
  .addPositionalParam('address', 'Address of an invited user')
  .setAction(async ({ address }) => {
    const contract = getContractAt(contractName)

    const balance = await contract.balanceOf(address)
    console.log(`Address ${address} has ${balance.toNumber()} invite tickets`)
    process.exit(0)
  })

task('invite', 'Invite address')
  .addPositionalParam('address', 'Address of an user to invite')
  .setAction(async ({ address }) => {
    const contract = getContractAt(contractName)

    await contract.invite(address, '')
    console.log(`Address ${address} has been invited`)
    process.exit(0)
  })
