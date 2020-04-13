import "./Swap.sol";
import "./interface/IRate.sol";

pragma solidity ^0.5.12;

contract SwapFactory {

  uint256 private ID ;
  uint256 fixedRate = 50; //放大1000倍
  uint256 private swapID;
  address private owner;

     struct Rate {
    uint256 time;
    uint256 Crate;

  }

    mapping (uint256 => Rate) public rateMapp;
    mapping (uint256 => address) public swaps;

    event createSwapEvent(uint256 Id,uint256 rateId,address short, address long, uint256 amount,uint256 time, address swapAddr);

     constructor ()  public {

        owner = msg.sender;
        rateMapp[0].time = now;
        rateMapp[0].Crate = 50;

     }

      modifier onlyOwner() {
        require(msg.sender == owner, "Ownable: caller is not the owner");
          _;
      }

   function viewOwer() public view returns(address){

    return owner;

  }


  address  RateAddr = 0x174d45Cae03c4aB03897Ea6cB5d46325Ee20Fe23;
  IRate  RateContract =  IRate(RateAddr);


 function createSwap(address _short, address _long, uint256 _amount, uint256 _time )  public returns(address)  {

   address short = _short;
   address long = _long;
   uint256 amount = _amount;
   uint256 time = _time;
   uint256 id = RateContract.currentRateId() ;
   address SwapAddr;
   Swap  s = new Swap(id,short,long,amount,time);
   SwapAddr = address(s);
   swaps[swapID] = SwapAddr;
    emit createSwapEvent(swapID,id,short,long,amount,time,SwapAddr);
   swapID ++;

   return SwapAddr;
}

function viewSwapAddress(uint256 id) public view returns (address) {

  return swaps[id];

}

}
