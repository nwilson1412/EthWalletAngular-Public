import Web3 from 'web3';

var get_web3 = function(){

  var web3;

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof (<any>window).web3 !== 'undefined') {
    console.warn("Using web3 detected from external source.")
    // Use Mist/MetaMask's provider
    web3 = new Web3((<any>window).web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to . You should remove this fallback when you deploy live, as it's inherently insecure.");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    //web3 = new Web3(new Web3.providers.HttpProvider("http://58.7.40.25:8546"));
    web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/cyNgApVB0JFY4LaZomim"));
  }

  return web3;

}

export default get_web3;