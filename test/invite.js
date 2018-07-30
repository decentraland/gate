const BigNumber = web3.BigNumber

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should()

const EVMRevert = 'VM Exception while processing transaction: revert'

const Invite = artifacts.require('DecentralandInvite')

contract('Invite', function([_, owner, inviter, user, otherUser]) {
  let invite
  const gasParams = {
    gas: 6e6,
    gasPrice: 21e9
  }

  async function allowAndInvite(inviter) {
    await invite.allow(inviter, 1, { from: owner })
    await invite.invite(user, '', { from: inviter, ...gasParams })
    return (await invite.totalSupply()) - 1
  }

  beforeEach(async function() {
    // Create contract
    invite = await Invite.new({ from: owner })
  })

  describe('Paused', function() {
    it('Should throw if transfer tried', async function() {
      const tokenId = await allowAndInvite(inviter, user)

      // Pause the contract
      await invite.pause({ from: owner })

      // transferFrom
      await invite
        .transferFrom(user, otherUser, tokenId, { from: user, ...gasParams })
        .should.be.rejectedWith(EVMRevert)

      // safeTransferFrom
      await invite
        .safeTransferFrom(user, otherUser, tokenId, {
          from: user,
          ...gasParams
        })
        .should.be.rejectedWith(EVMRevert)
    })
  })

  describe('Unpaused', function() {
    it('Should transfer to correct new owners', async function() {
      const tokenId = await allowAndInvite(inviter, user)

      // transferFrom
      await invite.transferFrom(user, otherUser, tokenId, {
        from: user,
        ...gasParams
      })
      const tokenOwner1 = await invite.ownerOf(tokenId)
      tokenOwner1.should.be.equal(otherUser)

      // safeTransferFrom
      await invite.safeTransferFrom(otherUser, user, tokenId, {
        from: otherUser,
        ...gasParams
      })
      const tokenOwner2 = await invite.ownerOf(tokenId)
      tokenOwner2.should.be.equal(user)
    })
  })
})
