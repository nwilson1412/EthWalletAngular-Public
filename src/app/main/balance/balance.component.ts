// 3rd Party
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// Services
import { Web3Service } from '../../services/web3.service';

// Models
import { EtherScanTransactionDataModel } from '../../models/etherScanTransactionData.model';
import { EtherScanTransactionDataResultModel } from '../../models/etherScanTransactionDataResult.model';

@Component({
    selector: 'balance-view',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.css']
})  

export class BalanceComponent implements OnInit {
    addressInput: string;
    userAddress: string;
    userBalance: number;
    userTransactionData: any = [];
    userBlockNumber: number;
    userBlockData: any;
    currentBLockNumber: number;
    currentBlockData: any;
    ethAddress: any;

    constructor(
        private http: HttpClient,
        private web3serv: Web3Service
    ){}
    
    ngOnInit():void {}

    /* Component calls (from the HTML view) */
    loadAddressData(userAddress){
        console.log(userAddress);
        this.ethAddress = this.web3serv.EnsLookup(userAddress)
        console.log(this.ethAddress);
        this.web3serv.getBalance(this.ethAddress).then((response) => {
           // this.web3serv.EnsLookup(userAddress).then((response) => {
            this.userBalance = response / 1000000000000000000;
            this.userAddress = userAddress;
            this.getAddressTransactions(userAddress).then((response: EtherScanTransactionDataModel) => {
                for(var i = 0; i < response.result.length; i++){
                    this.userTransactionData.push(response.result[i]);  
                }
            });
        });
    }


    /* Test Etherscan API */
    getAddressTransactions(userAddress: string){
            return this.http.get('https://api.etherscan.io/api?module=account&action=txlist&address='
            + userAddress + '&startblock=0&endblock='+this.web3serv.getCurrentBlock+'&sort=desc&apikey=5R3BDH5G62J7PCWIIU7UHT2E4EDS1Z41G5').toPromise();
    }
}



