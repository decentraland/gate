pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract DecentralandInvite is ERC721Token, Ownable {
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

  function setTokenURI(uint256 id, string uri) public {
    require(msg.sender == ownerOf(id));
    _setTokenURI(id, uri);
    emit URIUpdated(id, uri);
  }
}
