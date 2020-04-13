
var SwapFactory = artifacts.require("./SwapFactory.sol");
var Swap = artifacts.require("./Swap.sol");


module.exports = function(deployer) {
    deployer.deploy(Swap,0,"0x0000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000",0,0);
   deployer.deploy(SwapFactory);

};
