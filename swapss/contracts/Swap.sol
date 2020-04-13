
import "./interface/IRate.sol";
pragma solidity ^0.5.12;

contract Swap {

       uint256 public rateId;
       address public short;
   	   address public long;
       uint256 public amount;
       uint256 public time;
   	   uint256 public startTime;
   	   uint256 public endTime;
       uint256 public floatAmount;
       uint256 public fixedAmount;
       bool public tf;
       address  RateAddr =0x174d45Cae03c4aB03897Ea6cB5d46325Ee20Fe23;

       IRate  RateContract =  IRate(RateAddr);
       function viewSwap() public  returns (uint256,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bool) {
              (floatAmount, fixedAmount) = viewAmount();

            return (rateId,short,long,amount,time,startTime,endTime,floatAmount,fixedAmount,tf);
       }

    constructor(uint256 _rateId,address _short,address _long,uint256 _amount,uint256 _time) public {
      rateId = _rateId;
      short = _short;
      long = _long;
      amount = _amount;
      time = _time;
      startTime = now;
      endTime = startTime + time;
      floatAmount = 0;
      fixedAmount = 0;
      tf = false;

    }

function viewRateAddress() public view returns (address) {

  return  RateAddr;

}

    function viewAmount() public  returns (uint256,uint256) {

    uint256 newRate = RateContract.currentRateId();
    uint256 newFloat = floatAmount;
    uint256 newFixed = fixedAmount ;

    for(uint256 i = rateId + 1 ; i < newRate + 1; i++){
         uint256 rate;
        (,,rate) = RateContract.viewRate(i);

         newFloat = newFloat + amount * rate / 1000;
         newFixed = newFixed + amount * 50 / 1000;
      }

      floatAmount = newFloat;
    fixedAmount = newFixed;
     rateId = newRate;

  return (floatAmount,fixedAmount);
}


function closeSwap() public returns (bool ) {
       require(endTime < now);

       if(rateId < RateContract.currentRateId()){
           viewAmount();
       }
       tf = true;
       return true;
}


}
