

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
    $.getJSON('SwapFactory.json', function(data) {

      return App.bindEvents();
      });
  },

  bindEvents: function() {
    $(document).on('click', '#viewButton', App.handleViewRate);
    $(document).on('click', '#swapButton', App.handleSwap);

    $(document).on('click', '#ownerButton', App.handleOwner);
    $(document).on('click', '#viewSwap', App.handleViewSwap);

  },
  handleViewSwap:function () {
      $.getJSON('SwapFactory.json', function(data) {
        var Artifact = data;
        App.contracts.SwapFactory = TruffleContract(Artifact);
        // Set the provider for our contract.
        App.contracts.SwapFactory.setProvider(App.web3Provider);
        var SwapInstance;
        App.contracts.SwapFactory.deployed().then(function(instance){
             SwapInstance = instance;
              var id = parseInt($('#amount').val());
            return SwapInstance.viewSwapAddress(id);

       }).then(function(result) {
          console.log(result);
          var address = result;
          $.getJSON('Swap.json', function(data) {

           // Get the necessary contract artifact file and instantiate it with truffle-contract.
           var Artifact = data;
           App.contracts.Swap = TruffleContract(Artifact);
           // Set the provider for our contract.
           App.contracts.Swap.setProvider(App.web3Provider);
           var SwapInstance;
         //  var contract_address = "0x71f6F2C5213D87b27E9e34206EBCf337e1a3ee7a";
       var contract_address = address;
          App.contracts.Swap.at(contract_address).then(function(instance){
         //  App.contracts.Swap.deployed().then(function(instance){

                SwapInstance = instance;
                console.log(SwapInstance);
               return SwapInstance.viewAmount.call();
           //  return ERC20Instance._mint(toAddress, amount);
           }).then(function(result) {
             console.log(result);


           }).catch(function(err){

             console.log(err.message);
           });

   });
        }).catch(function(err){

          console.log(err.message);
          });


  });

},


  handleOwner:function(){
    $.getJSON('SwapFactory.json', function(data) {
      web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      console.log(account);

      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var Artifact = data;
      App.contracts.SwapFactory = TruffleContract(Artifact);
      // Set the provider for our contract.
      App.contracts.SwapFactory.setProvider(App.web3Provider);
      var SwapInstance;
      App.contracts.SwapFactory.deployed().then(function(instance){
           SwapInstance = instance;
              var id = parseInt($('#amount').val());
          return SwapInstance.viewSwapAddress(id);
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
handleViewRate: async () =>{
  $.getJSON('SwapFactory.json', function(data) {
    web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }

    var account = accounts[0];
    console.log(account);

    // Get the necessary contract artifact file and instantiate it with truffle-contract.
    var Artifact = data;
    App.contracts.SwapFactory = TruffleContract(Artifact);
    // Set the provider for our contract.
    App.contracts.SwapFactory.setProvider(App.web3Provider);
    var SwapInstance;
    App.contracts.SwapFactory.deployed().then(function(instance){
         SwapInstance = instance;
           var id = parseInt($('#TTTransferAmount').val());
         console.log(SwapInstance);
        return SwapInstance.viewRate(id);
    //  return ERC20Instance._mint(toAddress, amount);
  }).then(function(result) {
 console.log(result);

  }).catch(function(err){
      console.log(err.message);
   });
  });
  });
},


  handleSwap: async () => {
// Use our contract to retieve and mark the adopted pets.
    $.getJSON('SwapFactory.json', function(data) {
      web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      console.log(account);

      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var Artifact = data;
      App.contracts.SwapFactory = TruffleContract(Artifact);
      // Set the provider for our contract.
      App.contracts.SwapFactory.setProvider(App.web3Provider);
      var SwapInstance;
    //  var contract_address = "0x500C97f2757432F41a1191E3E23807d0185B6064";
    //  App.contracts.newSwap.at(contract_address).then(function(instance){
      App.contracts.SwapFactory.deployed().then(function(instance){

           SwapInstance = instance;
           console.log(SwapInstance);
              var short = $('#short').val();
              var long = $('#long').val();
              var amount = parseInt($('#amount').val());
              var time = parseInt($('#time').val());
          return SwapInstance.createSwap(short,long,amount,time);
      //  return ERC20Instance._mint(toAddress, amount);
      }).then(function(result) {
        console.log(result);
        console.log(result.logs[0].args.Id.c[0]);
        console.log(result.logs[0].args.long);
        console.log(result.logs[0].args.rateId.c[0]);
        console.log(result.logs[0].args.amount.c[0]);
        console.log(result.logs[0].args.short);
        console.log(result.logs[0].args.swapAddr);
        console.log(result.logs[0].args.time.c[0]);
        var id = result.logs[0].args.Id.c[0];
        var long = result.logs[0].args.long;
        var rateId = result.logs[0].args.rateId.c[0];
        var amount = result.logs[0].args.amount.c[0];
        var short = result.logs[0].args.short;
        var swapAddr = result.logs[0].args.swapAddr;
        var time = result.logs[0].args.time.c[0];

        $(".panel-div").hide();
        $(".panel-content").append('<strong>swapID</strong>: <span id="swapID">'+ id +'</span><br/><br/>');
        $(".panel-content").append('<strong>RateID</strong>: <span id="RateID">'+ rateId +'</span><br/><br/>');
        $(".panel-content").append('<strong>shortPosition</strong>: <span id="shortPosition">'+ short +'</span><br/><br/>');
        $(".panel-content").append('<strong>longPosition</strong>: <span id="longPosition">'+ long +'</span><br/><br/>');
        $(".panel-content").append('<strong>SwapTime</strong>: <span id="SwapTime">'+ time +'</span><br/><br/>');
        $(".panel-content").append('<strong>SwapAmount</strong>: <span id="SwapAmount">'+ amount +'</span><br/><br/>');
        $(".panel-content").append('<strong>swapAddress</strong>: <span id="SwapAddress">'+ swapAddr +'</span><br/><br/>');

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
