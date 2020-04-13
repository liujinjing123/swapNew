

App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
     web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
      web3 = new Web3(App.web3Provider);

  }
   return App.initContract();
  },

  initContract: function() {
    $.getJSON('CRate.json', function(data) {

      return App.bindEvents();
      });
  },

  bindEvents: function() {
    $(document).on('click', '#viewRate', App.handleViewRate);
    $(document).on('click', '#changeRate', App.handleRate);
    $(document).on('click', '#ownerButton', App.handleOwner);
    $(document).on('click', '#currentRateId', App.handleCurrent);

  },
  handleViewRate:function () {
     $.getJSON('CRate.json', function(data) {
      web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      console.log(account);

      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var Artifact = data;
      App.contracts.CRate = TruffleContract(Artifact);
      // Set the provider for our contract.
      App.contracts.CRate.setProvider(App.web3Provider);
      var SwapInstance;
    //  var contract_address = "0xf7053fa828117bb121577898a1126dbb6fd66ed9";
    // App.contracts.Swap.at(contract_address).then(function(instance){
      App.contracts.CRate.deployed().then(function(instance){

           SwapInstance = instance;
           console.log(SwapInstance);
           var id = parseInt($('#amount').val());
          return SwapInstance.viewRate(id);
      //  return ERC20Instance._mint(toAddress, amount);
      }).then(function(result) {
        console.log(result);
        var res = result[2].c[0];
        $(".panel-div").hide();
        $(".panel-content").append('<strong>Rate</strong>: <span id="rate">'+ res / 1000 +'</span><br/><br/>');
      }).catch(function(err){

      }).catch(function(err){

        console.log(err.message);
      });


  });

});
},


  handleOwner:function(){
    $.getJSON('CRate.json', function(data) {
      web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      console.log(account);

      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var Artifact = data;
      App.contracts.CRate = TruffleContract(Artifact);
      // Set the provider for our contract.
      App.contracts.CRate.setProvider(App.web3Provider);
      var SwapInstance;
      App.contracts.CRate.deployed().then(function(instance){
           SwapInstance = instance;

          return SwapInstance.viewOwer.call();
      //  return ERC20Instance._mint(toAddress, amount);
    }).then(function(result) {
      console.log(result);
      $(".panel-div").hide();
      $(".panel-content").append('<strong>owner</strong>: <span id="owner">'+ result +'</span><br/><br/>');
    }).catch(function(err){
        console.log(err.message);
    });
      });
        });
  },

handleRate:function(){
  $.getJSON('CRate.json', function(data) {
    web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }

    var account = accounts[0];
    console.log(account);

    // Get the necessary contract artifact file and instantiate it with truffle-contract.
    var Artifact = data;
    App.contracts.CRate = TruffleContract(Artifact);
    // Set the provider for our contract.
    App.contracts.CRate.setProvider(App.web3Provider);
    var SwapInstance;
    App.contracts.CRate.deployed().then(function(instance){
         SwapInstance = instance;
           var id = parseInt($('#amount').val());
         console.log(SwapInstance);
        return SwapInstance.changeRate(id);
    //  return ERC20Instance._mint(toAddress, amount);
  }).then(function(result) {
  console.log(result);

  }).catch(function(err){
      console.log(err.message);
  });
    });
      });
},
handleCurrent: async () => {
// Use our contract to retieve and mark the adopted pets.
    $.getJSON('CRate.json', function(data) {
      web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      console.log(account);

      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var Artifact = data;
      App.contracts.CRate = TruffleContract(Artifact);
      // Set the provider for our contract.
      App.contracts.CRate.setProvider(App.web3Provider);
      var SwapInstance;
    //  var contract_address = "0x500C97f2757432F41a1191E3E23807d0185B6064";
    //  App.contracts.newSwap.at(contract_address).then(function(instance){
      App.contracts.CRate.deployed().then(function(instance){

           SwapInstance = instance;

          return SwapInstance.currentRateId.call();
      //  return ERC20Instance._mint(toAddress, amount);
      }).then(function(result) {
        console.log(result);
        var curr = result.c[0];
        $(".panel-div").hide();
        $(".panel-content").append('<strong>currentRateId</strong>: <span id="currentRateId">'+ curr +'</span><br/><br/>');

      }).catch(function(err){

        console.log(err.message);
      });


  });

});
},
};

$(function() {
  $(window).on('load',function() {
    App.init();
  });
});


window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        let ethereum = window.ethereum;
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            web3.eth.getAccounts[0];
        } catch (error) {
            // User denied account access...
        }
    }

});
