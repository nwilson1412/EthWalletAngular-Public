import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import getweb3 from '../../components/web3';
import Web3 from 'web3';

@Component({
    selector: 'balance-view',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.css']
})  

export class BalanceComponent implements OnInit {
    web3: any;

    // ISaac vars
    addressInput: string;
    userAddress: string;
    userBalance: number;
    userTransactions: number;
    userBlockNumber: number;
    userBlockData: any;
    currentBLockNumber: number;
    currentBlockData: any;


    //Nath vars
    successData: any;
    successBlockNumber: number;
    currentBlock: number;
    webProvider: any;
    netGeth: any ;
    coinbase: any;
    coinBal: any;
    gethBlock: any;
    userIn: any;

    constructor(){
        this.setupWeb3();
    }
    
    ngOnInit():void {}

    /* Component calls (from the HTML view) */
    loadAddressData(userAddress){
        this.userAddress = userAddress;
        this.getBalance(userAddress).then((response) => {
            this.userBalance = response / 1000000000000000000;
            // this.getTransactions(userAddress).then((response) => {
            //     this.userTransactions = response;
            // });
        });
    }

    /* Web 3 calls */
    getStatus(){
        return this.web3.eth.net.isListening();
    }

    getBalance(address: string){
        return this.web3.eth.getBalance(address);
    }

    // This was in the API but apparently doesn't work? 
    // getTransactions(address: string){
    //     return this.web3.eth.getTransaction(address);
    // }

    getCurrentBlockNumber(){
        return this.web3.eth.getBlockNumber();
    }

    getCurrentBlock(){
        this.getCurrentBlockNumber().then((response) => {
            return this.getBlockData(response);
        });
    }

    getBlockData(blockNumber: number){
        return this.web3.eth.getBlock(blockNumber);
    }

    /* SETUP STUFF */
    setupWeb3(): void{
        this.web3 = getweb3();
    }


    /* Just left these in for reference if you wanted theM? they're all part of the functions above now though. 
    delete if you don't need */

    // this.coinbase = '0x000000000000000000000000000000000000dead';
    // //this.web3.fromWei(this.web3.eth.getBalance(account),"ether");
    // console.log('this is the account; ' + this.coinbase)

    // this.web3.eth.getBalance(this.coinbase).then((coin) =>{
    //     coin = coin / 1000000000000000000;
    //     this.coinBal = coin

    // });


    // this.web3.eth.getBlockNumber().then((successBlockNumber) => {
    //     this.currentBlock = successBlockNumber;
    // //  console.log(this.currentBlock);
    // });
    
    // this.web3.eth.getBlock(0).then((successData) => {
    //     this.gethBlock = successData;
    //     console.log(this.gethBlock);
    //     console.log(this.currentBlock);
    // });

}


