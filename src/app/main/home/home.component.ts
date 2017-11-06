import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import getweb3 from '../../components/web3';
import web3p from 'web3';



//var Web3EthAccounts = require('web3-eth-accounts');
//import Web3EthAccounts from '../../components/web3'

@Component({
    selector: 'home-view',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    x: number;
    web3: any;
    //web3a: any;
    cryptoList: any;
    ethStats: any;
    //gethBlock: any;
    successData: any;
    accountx: any;
    gethBlock = {
        difficulty: '',
        gasLimit: '', 
        };
    

    successData2: number;
    currentBlock: number;
    aa: any;

    constructor(private http: HttpClient){

    }

    ngOnInit():void {
        // this.http.get('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=AUD').subscribe(data => {
        //     this.ethStats = data;
        //     console.log(this.ethStats);
        // });

        
        this.http.get('https://api.coinmarketcap.com/v1/ticker/?convert=AUD').subscribe(data => {
        this.cryptoList = data;
         });
        
        
        
         this.web3 = getweb3();
         //this.web3 = new web3p.providers.HttpProvider("http://58.7.40.25:8546");


        this.web3.eth.getBlockNumber().then((successData2) => {
            this.currentBlock = successData2;
         //   console.log(this.currentBlock);
        });

        this.web3.eth.getBlock(0).then((successData) => {
              this.gethBlock = successData;
              console.log(this.gethBlock);
              console.log(this.currentBlock);
        });

        /*
        this.web3.eth.personal.getAccounts.then((successData) => {
            this.gethBlock = successData;
            console.log(this.gethBlock);
            console.log(this.currentBlock);
      })*/

        // /return this.gethBlock;


        
        
       // var bknum = this.web3.eth.getBlockNumber;
        //console.log(bknum) //this shows a function, not the number(?)
        
        
        
    }

}