const BigNumber = web3.BigNumber

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should()

const EVMRevert = 'VM Exception while processing transaction: revert'

const Invite = artifacts.require('DecentralandInvite')

contract('Invite', function([_, owner, inviter, user1, user2]) {
  let invite
  const gasParams = {
    gas: 6e6,
    gasPrice: 21e9
  }

  async function allowAndInvite(inviter) {
    await invite.allow(inviter, 1, { from: owner })
    await invite.invite(user1, '', { from: inviter, ...gasParams })
    return (await invite.totalSupply()) - 1
  }

  beforeEach(async function() {
    // Create contract
    invite = await Invite.new({ from: owner })
  })

  describe('Paused', function() {
    it('Should throw if transfer tried', async function() {
      const tokenId = await allowAndInvite(inviter, user1)

      // Pause the contract
      await invite.pause({ from: owner })

      // transferFrom
      await invite
        .transferFrom(user1, user2, tokenId, { from: user1, ...gasParams })
        .should.be.rejectedWith(EVMRevert)

      // safeTransferFrom
      await invite
        .safeTransferFrom(user1, user2, tokenId, {
          from: user1,
          ...gasParams
        })
        .should.be.rejectedWith(EVMRevert)
    })
  })

  describe('Unpaused', function() {
    it('Should transfer to correct new owners', async function() {
      const tokenId = await allowAndInvite(inviter, user1)

      // transferFrom
      await invite.transferFrom(user1, user2, tokenId, {
        from: user1,
        ...gasParams
      })
      const tokenOwner1 = await invite.ownerOf(tokenId)
      tokenOwner1.should.be.equal(user2)

      // safeTransferFrom
      await invite.safeTransferFrom(user2, user1, tokenId, {
        from: user2,
        ...gasParams
      })
      const tokenOwner2 = await invite.ownerOf(tokenId)
      tokenOwner2.should.be.equal(user1)
    })
  })

  describe('Revoke', function() {
    it('Should revoke all tokens for an address', async function() {
      await invite.allow(inviter, 2, { from: owner })

      await invite.invite(user1, '', { from: inviter, ...gasParams })
      await invite.invite(user1, '', { from: inviter, ...gasParams })
      const beforeUserTokensCount = await invite.balanceOf(user1)
      beforeUserTokensCount.should.be.bignumber.equal(2)

      await invite.revoke(user1, { from: owner, ...gasParams })
      const afterUserTokensCount = await invite.balanceOf(user1)
      afterUserTokensCount.should.be.bignumber.equal(0)
    })

    it('Should throw if revoker is not the owner', async function() {
      await allowAndInvite(inviter, user1)
      await invite
        .revoke(user1, { from: inviter, ...gasParams })
        .should.be.rejectedWith(EVMRevert)
    })

    it('Should throw if address does not have tokens', async function() {
      invite.revoke(user1, { from: owner }).should.be.rejectedWith(EVMRevert)
    })
  })
})
