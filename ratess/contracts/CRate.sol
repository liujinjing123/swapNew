
pragma solidity ^0.5.12;

contract CRate {

  uint256 private ID ;
  address private owner;

     struct Rate {
    uint256 time;
    uint256 Crate;

  }

    mapping (uint256 => Rate) private rateMapp;

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


function viewRate(uint256 id) public view returns (uint256,uint256,uint256) {

  Rate memory r = rateMapp[id];
  uint256 t = r.time;
  uint256 ra = r.Crate;
  return (id,t,ra);

}

function currentRateId() public view returns(uint256) {
    return ID;
}

function changeRate(uint256 _currentRate)  public  onlyOwner{
    Rate memory r1 = rateMapp[ID];
    require(r1.time + 10 < now);
    ID++;
     Rate storage r2 = rateMapp[ID];
     r2.time = now;
     r2.Crate = _currentRate;

}


}
