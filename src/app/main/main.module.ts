import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { BalanceComponent } from './balance/balance.component';
import { WalletComponent } from './wallet/wallet.component';


/*import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";


import web3q from '../components/web3';

var web3 = web3q();
console.log(web3.getBlockNumber);
console.log();*/

//import Web3 from 'web3';


//const Web3 = require('web3');
//var web3 = new Web3(new Web3.providers.HttpProvider("http://58.7.40.25:8546"));
//this.web3.isConnected();



//let web3:Web3 = new Web3();
//var web3 = new Web3(new Web3.providers.HttpProvider("http://58.7.40.25:8546"));
/*console.log("terawtwta")

var ethbalance = web3.eth.getBalance('0x000000000000000000000000000000000000dead');

console.log(ethbalance);

var number = web3.eth.getBlockNumber;

console.log(number);

*/



@NgModule({
    declarations: [
        HomeComponent,
        BalanceComponent,
        WalletComponent
    ],

    imports: [
        BrowserModule,
        FormsModule,
        CommonModule
    ],

    exports: [
        BalanceComponent,
        WalletComponent
    ],
  
    providers: [],

})
export class MainModule {}
