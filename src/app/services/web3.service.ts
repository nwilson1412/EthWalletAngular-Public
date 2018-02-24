import {Injectable} from '@angular/core';

import Web3 from 'web3';
//import Ens from 'ethereum-ens';

import ENS from 'ethjs-ens';
//import HttpProvider from 'ethjs-provider-http';

import ntkABI from '../components/contracts/ntk.json';

@Injectable()
export class Web3Service{

    public web3Connection = null; 
    public NTKABIContractadd = null;
    //ensConnection = null;
   // ens: any;
   // address: string;
    NTKAddress: string;
    NTKAddressShort: string;
    txCount: number;
    NTKBalanceAmount: number;
    //ntkABIContract: any;
    //ntkABI: any;
    


    constructor(){
        this.NTKAddress = ('0xc484a17197dda87826a3987cbce90d845f21cae4');
        this.NTKAddressShort = (this.NTKAddress).substring(2);
        
        this.setup();

        //Hex'ed contract address
        
        //0x removed from contract address
       

        

    } 


    /* Setup Functions */
    setup(){
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if(typeof (<any>window).web3 !== 'undefined'){
            // Use Mist/MetaMask's provider
            this.web3Connection = new Web3((<any>window).web3.currentProvider);

        }else{
            Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
           
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            this.web3Connection = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/cyNgApVB0JFY4LaZomim'))

        }
        //this.NTKABIContractadd = new this.web3Connection.eth.Contract(ntkABI, this.NTKAddress);
        const provider = (this.web3Connection.currentProvider);

        //ENS wont work in testnet
       // this.ens = new ENS({ provider, network: '1' });
    }

    //#region WEB3 ACCOUNT FUNCTIONS

    public ntkInitialization(fromAddress: string){
        return new Promise((resolve, error) => {
            var tokenContract = new this.web3Connection.eth.Contract(ntkABI, this.NTKAddress, {from: fromAddress});
            this.ntkBalance(tokenContract, fromAddress);

        })


    }

    private ntkBalance(tokenContract: any, fromAddress: string) {
        return new Promise((resolve, error) => {
            tokenContract.methods.balanceOf(fromAddress).call().then((response) => {
                this.NTKBalanceAmount = response
                
               // this.NTKBalanceAmount = resolve(balance);
                console.log("Balance of NTK:", this.NTKBalanceAmount);

            })
        });
    }

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


    //#endregion
/*
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
    */

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

    /*
    public ntkABIContract(){
        console.log("Error???")
        var x = new this.web3Connection.eth.Contract(ntkABI);
        console.log(x, "WFWFF");
       // console.log("NTKContract initiated..")
       // return this.ntkABIContract
     //   return ntkABIContract
    }
*/
    // This was in the API but apparently doesn't work? 
    // getTransactions(address: string){
    //     return this.web3.eth.getTransaction(address);
    // }

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