# EtherWallet

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

#Intro
Welcome! 
Thanks for checkin us out and we hope you enjoyed our code fair project.

Here we will be showing a run-down of the technologies used and their importance to this project!

#Purpose

During this year our team have gained an increased interest in the blockchain space and wanted get a better understanding about how this new technology works and what can be made using it.

Resaerch has been done by the team that reviewed the usability of current blockchain wallets and found an increased complexity for the users, one way we were trying to tackle this is by incorperating ENS (Etheum Name System) into this webwallet to reduce the exposure of wallet private keys when wanting to check wallet balances.  

As well as increasing awareness of security in the Blockchain space, the team have been eager in developing technology on this new platform, which this project allows us to try out. 

##Eth wallets - Public and Private keys

An Ethereum wallet contains two core pieces of information, a private key, and a public key. 

The public key is something that everyone can see and is what people send Ethereum or ERC20 tokens to, an example of this is; 0xb4d249a09af346e3d8986a2c63424874ea8dd3b1	

A private key (example with numbers replaced with .'s) '0x02f3c................................................eebcbeecc' should only ever be know by the owner of a wallet (Public Key *See above). The Private key is unique and shows ownership of a public key. To access or send funds from your wallet you will need to create a transaction with your Private key.

##Eth wallet issues

This address structure for public keys are hard to remember and the only real way to view your balance is to log into a service with your private key, exposing it to malicious use or by remembering you public address (which is rather long). Public keys can be stored as well, and referenced to view funds, but this still requires the storage and access to the saved copy, reducning usability.

For main stream adoption of Blockchain technologies, users will need a quick and easy way to verify if funds have been sent to their wallet, without putting their private keys at risk.

##ENS - Ethereum Name Service
One core element to this is ENS, Etherum Domain Name's. 

An Etherum Name Service can associate a wallet address (public key), to a human-readable address, an example of this is tknwallet.eth

Currently going to our site (https://taulelei.github.io/EthWalletAngular/balance)
you can input an ENS and view all Eth transactions from that address. This is easy to remember and quick to access if you're 'on the go'

##ENS - Continued

To set up an ENS is still over-complicated for the standard user, currently the only way to buy an ENS name without third-parties the user will need to go through a 'dutch-auction' type system at https://registrar.ens.domains using a web3 enabled browser and the crypto currency Ethreum for transactions.

Third-party ENS marketplaces like https://namebazaar.io/ and https://enslisting.com are making the process easier, and quicker to obtain ENS's, but these still require a web3 enabled browser.


#Technologies

--Ethereum!
"Ethereum is an open-source, public, blockchain-based distributed computing platform featuring smart contract (scripting) functionality. It provides a decentralized Turing-complete virtual machine, the Ethereum Virtual Machine (EVM), which can execute scripts using an international network of public nodes." -https://en.wikipedia.org/wiki/Ethereum

--Web3
Web3 is a method used to expose the Etherum network through RPC(remote Procedure Calls) in the browser. A common RPC client is GETH (GoEtherum). Being able to communication to a GETH node though RPC allows for a browser to communicate directly to the Etherum network. 

--Geth
Geth is the GoLang implementation of the Ethereum protocal. Being able to interact with the ethereum blockchain allows for a plethora of use cases and implementations. 

Geth can be exposed through IPC(Interprocess Communication) and RPC. IPC if the geth node is running on the same device as the web3 implementation. RPC is used  

--Web3 Providers
Providers determine how the web applciation will connect to the blockchain, a provider can be locally determined allowing the user to run and connect to their own GETH node, connect a Geth node that the website creator determined, or to look for an existing provider connection (MetaMask (https://metamask.io), Mist(https://github.com/ethereum/mist/releases))

The service privider used in this web app is a hosted Geth node (Infura), but it will default to the users chosen provider if they are already running a web3 enabled browser. 


--node.js, npm
Npm (Node Package Manager) was used throughout this project to ensure packages, and their dependancies were managed correctly.

--Angular 2
Angular 2 was chosen as the front end development framework due to it's increased used in asynchronous function calls and increased use in Promises.

--API's
Two external API's were used, the first being coinmarketcap, to gather the token price for the tickers on the home page; https://coinmarketcap.com/api

The second API was etherscan. Etherscan was used to get transaction history
http://etherscan.io/apis

All other data was gathered from Geth using JSON-RPC.


##Resources

Ethereum; https://www.ethereum.org/
web3; https://github.com/ethereum/web3.js/
geth; https://geth.ethereum.org/
ens; http://ens.domains/




## Setup

1) Install NodeJS: https://nodejs.org/en/

2) Install Git Bash: https://git-scm.com/downloads

3)  Install Python 2.7.14 https://www.python.org/downloads/

If using a windows PC: Install windows build tools: http://landinghub.visualstudio.com/visual-cpp-build-tools or Visual studio: https://www.visualstudio.com

4) Install node-gyp https://www.npmjs.com/package/node-gyp 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

