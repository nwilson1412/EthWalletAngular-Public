import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//import web3p from 'web3';



//var Web3EthAccounts = require('web3-eth-accounts');
//import Web3EthAccounts from '../../components/web3'

@Component({
    selector: 'home-view',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {    
    //web3a: any;
    cryptoList: any;
    ethStats: any;
    //gethBlock: any;


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
        
    }

}