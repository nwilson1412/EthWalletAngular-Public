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

    setup(){
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if(typeof (<any>window).web3 !== 'undefined'){
            // Use Mist/MetaMask's provider
            this.web3Connection = new Web3((<any>window).web3.currentProvider);
            const provider = (this.web3Connection.currentProvider)
            this.ens = new ENS({ provider, network: '1' })

        }else{
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            this.web3Connection = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/cyNgApVB0JFY4LaZomim'))
            const provider = (this.web3Connection.currentProvider)
            this.ens = new ENS({ provider, network: '1' })
        }
    }


    public EnsLookup(userInputEns: string){
        //used to look up ENS addresses on the Ethereum Blockchain
        this.ens.lookup(userInputEns)
        .then((address) => {
            this.address = address;
            console.log(this.address);
            return this.address;
        })
        .catch((reason) => {
          console.error(reason)
          return reason;
        })
      }

    public createAccount(){
        return this.web3Connection.eth.accounts.create();
    }

    /* Web 3 calls */
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

    /* ENS calls */
    public getDomainFromHex(address: string){
        return this.ensConnection.reverse(address).addr();
    }

    public getHexFromDomain(domain: string){
        return this.ensConnection.resolver(domain).addr();
    }

}