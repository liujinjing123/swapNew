// 定义HDWalletProvider对象
var HDWalletProvider = require("truffle-hdwallet-provider");
// 提供助记词（mnemonic）来生成你的账户
let mnemonic = 'keen captain chicken marine off attract way doctor hidden all lyrics black';
// 添加Ropsten测试网络定义
module.exports = {
  networks: {

    development: {
     host: "127.0.0.1",
     port: 8545,
     network_id: "*" // Match any network id
   },
    kovan: {
      provider: function() {
      // 定义以太坊节点 https://ropsten.infura.io/your-api-key
       return new HDWalletProvider(mnemonic, "https://kovan.infura.io/v3/4ffb22030905481fb111eb6ec86f6de1");
      },
      network_id: 42,
     gas: 6500000, // default = 4712388
     gasPrice: 10000000000,// default = 100 gwei = 100000000000
      networkCheckTimeout: 100000000
    }

  },
  compilers: {
    solc: {
      version: "0.5.12",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
