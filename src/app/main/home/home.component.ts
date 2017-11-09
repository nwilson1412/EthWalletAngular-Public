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
    cryptoList: Array<CryptocurrencyObject> = [];
    cryptoSelected: any = {};

    constructor(private http: HttpClient){
        this.loadData();   
    }

    ngOnInit():void {}

    loadData(){
        this.getCryptoList().then((response: CryptocurrencyObject[]) => {
            this.cryptoList = response;
            this.cryptoSelected = this.cryptoList[1];
        });
    }

    selectCrypto(coin: CryptocurrencyObject){
        this.cryptoSelected = coin;
    }

    getCryptoList(){
        return new Promise((resolve, reject) => {
            this.http.get('https://api.coinmarketcap.com/v1/ticker/?convert=AUD').subscribe(data => {
                resolve(data);
            });
        });
    }

    getSingleCrypto(coinName: string){
        return new Promise((resolve, reject) => {
            this.http.get('https://api.coinmarketcap.com/v1/ticker/' + coinName + '/?convert=AUD').subscribe(data => {
                resolve(data);
            });
        });
    }

}

export class CryptocurrencyObject{
    id: string;
    name: string;
    symbol: string;
    rank: string;
    // price_usd: string;
    // price_btc: string;
    // market_cap_usd: string; 
    // available_supply: string;
    // total_supply: string;
    // max_supply: string;
    // percent_change_1h: string;
    // percent_change_24h: string;
    // percent_change_7d: string;
    // last_updated: string;
    price_aud: string;
    market_cap_aud: string;
}