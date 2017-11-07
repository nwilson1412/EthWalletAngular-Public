import { Component } from '@angular/core';
import getweb3 from '../../components/web3';
import Web3 from 'web3'


@Component({
    selector: 'balance-view',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.css']
})
export class BalanceComponent {
    web3: any;
    successData: any;
    successBlockNumber: number;
    currentBlock: number;
    webProvider: any;
    netGeth: any ;
    coinbase: any;
    coinBal: any;

    gethBlock = {
        difficulty: '',
        gasLimit: '', 
        };

    constructor(){

    }

    ngOnInit():void {

    this.web3 = getweb3();
    //this.webProvider = new Web3.providers.HttpProvider("http://58.7.40.25:8546");
    //this.web3 = new Web3(this.webProvider)
    //this.web3 = new web3.providers.HttpProvider("rcd");
   //
   // this.web3.eth.gethBlock

   console.log("isConnected=");
   this.web3.eth.net.isListening().then((netlistenGeth) =>{
        this.netGeth = netlistenGeth;
        console.log(this.netGeth);
   });

   this.coinbase = '0x000000000000000000000000000000000000dead';
   //this.web3.fromWei(this.web3.eth.getBalance(account),"ether");
   console.log('this is the account; ' + this.coinbase)

   this.web3.eth.getBalance(this.coinbase).then((coin) =>{
       coin = coin / 1000000000000000000;
        this.coinBal = coin

        console.log(coin)
   });


   this.web3.eth.getBlockNumber().then((successBlockNumber) => {
    this.currentBlock = successBlockNumber;
//  console.log(this.currentBlock);
});

this.web3.eth.getBlock(0).then((successData) => {
    this.gethBlock = successData;
    console.log(this.gethBlock);
    console.log(this.currentBlock);
});

}}


