pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";

contract DecentralandInvite is ERC721Token, Ownable, Pausable {
  mapping (address => uint256) public balance;
  mapping (uint256 => bytes) public metadata;

  event Invited(address who, address target, uint256 id, bytes note);
  event UpdateInvites(address who, uint256 amount);
  event URIUpdated(uint256 id, string newUri);

  constructor() public ERC721Token("Decentraland Invite", "DCLI") {}

  function allow(address target, uint256 amount) public onlyOwner {
    balance[target] = amount;
    emit UpdateInvites(target, amount);
  }

  function invite(address target, bytes note) public {
    require(balance[msg.sender] > 0);
    balance[msg.sender] -= 1;
    uint256 id = totalSupply();
    _mint(target, id);
    metadata[id] = note;
    emit Invited(msg.sender, target, id, note);
  }

  function revoke(address target) onlyOwner public {
    require(ownedTokensCount[target] > 0);

    uint256 addressTokensCount = ownedTokensCount[target];

    // Collect token IDs to burn
    uint256[] memory burnTokenIds = new uint256[](addressTokensCount);
    for (uint256 i = 0; i < addressTokensCount; i++) {
      burnTokenIds[i] = tokenOfOwnerByIndex(target, i);
    }

    // Burn all tokens held by the target address
    for (i = 0; i < addressTokensCount; i++) {
      _burn(target, burnTokenIds[i]);
    }
  }

  function setTokenURI(uint256 id, string uri) public {
    require(msg.sender == ownerOf(id));
    _setTokenURI(id, uri);
    emit URIUpdated(id, uri);
  }

  function transferFrom(address _from, address _to, uint256 _tokenId) whenNotPaused public {
    super.transferFrom(_from, _to, _tokenId);
  }

  function safeTransferFrom(address _from, address _to, uint256 _tokenId) whenNotPaused public {
    super.safeTransferFrom(_from, _to, _tokenId);
  }

  function safeTransferFrom(
    address _from,
    address _to,
    uint256 _tokenId,
    bytes _data
  ) whenNotPaused public {
    super.safeTransferFrom(_from, _to, _tokenId, _data);
  }
}