pragma solidity ^0.8.21;
// License
// SPDX-License-Identifier: MIT

contract DataContract {

  address public deployer; 
  uint256 public price; 
  string private playbackId; 
  bool public active; 
  uint256 public totalPurchases;

  mapping(address => bool) public hasAccess;

  constructor(string memory _playbackId, uint256 _price) {
    deployer = msg.sender;
    playbackId = _playbackId;
    price = _price;
    totalPurchases = 0;
  }

  event PurchaseEvent(address indexed _buyer, uint256 _price);

  function purchaseAccess() public payable returns (string memory) {
    require(active, "Contract was marked inactive by creator");
    if (price != 0 && !hasAccess[msg.sender]) {
      require(msg.value >= price, "Incorrect price, enter the valid price");
      payable(deployer).transfer(msg.value);
      emit PurchaseEvent(msg.sender, price);
      totalPurchases += 1;
    }
    hasAccess[msg.sender] = true;
    return playbackId;
  }
function hasAccessed(address _buyer) public  returns (uint256){
    if(hasAccess[msg.sender]){
        return 1;
    }
    else{
        return 2;
    }
}
}

