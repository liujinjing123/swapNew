pragma solidity ^0.5.12;

contract  IRate {
  function viewRate(uint256 id) public view returns (uint256,uint256,uint256);
  function currentRateId() public view returns(uint256);
}
