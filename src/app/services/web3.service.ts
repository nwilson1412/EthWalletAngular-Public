import {Injectable} from '@angular/core';

import Web3 from 'web3';
//import Ens from 'ethereum-ens';

import ENS from 'ethjs-ens';
//import HttpProvider from 'ethjs-provider-http';

@Injectable()
export class Web3Service{

    public web3Connection = null; 
    ensConnection = null;
    ens: any;
    address: string;



    constructor(){
        this.setup();
    } 


    /* Setup Functions */
    setup(){
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if(typeof (<any>window).web3 !== 'undefined'){
            // Use Mist/MetaMask's provider
            this.web3Connection = new Web3((<any>window).web3.currentProvider);

        }else{
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            this.web3Connection = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/cyNgApVB0JFY4LaZomim'))
            const provider = (this.web3Connection.currentProvider)
            this.ens = new ENS({ provider, network: '1' })
        }
        const provider = (this.web3Connection.currentProvider);
        this.ens = new ENS({ provider, network: '1' });
    }

    //#region WEB3 ACCOUNT FUNCTIONS

    public createAccount(){
        return new Promise((resolve, reject) => {
            var account = this.web3Connection.eth.accounts.create();
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