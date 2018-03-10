import {Injectable} from '@angular/core';

import Web3 from 'web3';
//import Ens from 'ethereum-ens';

import ENS from 'ethjs-ens';
//import HttpProvider from 'ethjs-provider-http';

import ntkABI from '../components/contracts/ntk.json';

@Injectable()
export class Web3Service{

    public web3Connection = null; 
    //ensConnection = null;
    ens: any;
    NTKAddress: string;
    NTKAddressShort: string;
    txCount: number;
    NTKBalanceAmount: number;
    


    constructor(){
        this.NTKAddress = ('0xc484a17197dda87826a3987cbce90d845f21cae4');
        this.NTKAddressShort = (this.NTKAddress).substring(2);
        
        this.setup();
    } 


    /* Setup Functions */
    /***** Force connect to ropsten using infura node as web3 provider   ********/
    setup(){
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
       /* if(typeof (<any>window).web3 !== 'undefined'){
            // Use Mist/MetaMask's provider
            this.web3Connection = new Web3((<any>window).web3.currentProvider);

        }else{
           */ Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
           
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            this.web3Connection = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/cyNgApVB0JFY4LaZomim'))
            /*
        } */
        const provider = (this.web3Connection.currentProvider);

        //ENS wont work in testnet
       // this.ens = new ENS({ provider, network: '1' });
    }
    //#region Token Functions
    public ntkInitialization(fromAddress: string){
        var tokenContract = new this.web3Connection.eth.Contract(ntkABI, this.NTKAddress, {from: fromAddress});
        return tokenContract
    } 

    private tokenBalance(tokenContract: any, fromAddress: string) {
        return new Promise((resolve, error) => {
            tokenContract.methods.balanceOf(fromAddress).then((response) => {
                this.NTKBalanceAmount = response
                console.log("Balance of Token of:",tokenContract , this.NTKBalanceAmount);
            })
        });
    }
    //#endregion

    //#region WEB3 ACCOUNT FUNCTIONS


    public createAccount(){
        return new Promise((resolve, reject) => {
            var account = this.web3Connection.eth.accounts.create();
            resolve(account);
        });
    }

    public pkToAccount(pk: string){
        return new Promise((resolve, reject) => {
            var account = this.web3Connection.eth.accounts.privateKeyToAccount(pk);
            resolve(account);
        });
    }

    public encryptAccount(pk: string, password: string){
        return new Promise((resolve, reject) => {
            var encrypted = this.web3Connection.eth.accounts.encrypt(pk, password);
            resolve(encrypted);
        });
    }

    public decryptAccount(pk: string, password: string){
        return new Promise((resolve, reject) => {
            var decrypted = this.web3Connection.eth.accounts.decrypt();
            resolve(decrypted);
        }); 
    }


    //#endregion

    //#region ENS LOOKUP FUNCTIONS 
    public domainToHexLookup(userInputEns: string){
        //used to look up ENS addresses on the Ethereum Blockchain
        return this.ens.lookup(userInputEns);
    }

    public hexToDomainLookup(userInputHex: string){
        // used to lookup hex addresses from their ENS address
        return this.ens.reverse(userInputHex);
    }
    //#endregion


    //#region Web3 Calls
    //used to ensure web3 is connecting to web3 provider
    public getStatus(){
        return this.web3Connection.eth.net.isListening();
    }

    public getBalance(address: string){
        return this.web3Connection.eth.getBalance(address);
    }

    public getTxAmount(amount: string){
        console.log("step 1. address:", amount)
        return this.web3Connection.eth.getTransactionCount(amount);
    }

    public getCurrentBlockNumber(){
        return this.web3Connection.eth.getBlockNumber();
    }

    public getCurrentBlock(){
        this.getCurrentBlockNumber().then((response) => {
            return this.getBlockData(response);
        });
    }

    public getBlockData(blockNumber: number){
        return this.web3Connection.eth.getBlock(blockNumber);
    }
    //#endregion

}