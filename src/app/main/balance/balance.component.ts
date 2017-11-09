// 3rd Party
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CoolHttp } from 'angular2-cool-http';

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
    coolHttp: CoolHttp;
    addressInput: string;
    userAddress: string;
    userBalance: number;
    userTransactionData: any = [];
    userBlockNumber: number;
    userBlockData: any;
    currentBLockNumber: number;
    currentBlockData: any;
    ethAddress: any;
    public loading = false;

    constructor(
        private http: HttpClient,
        private web3serv: Web3Service,
        coolHttp: CoolHttp
    ){
        this.coolHttp = coolHttp;
    }
    
   // ngOnInit():void {

  //  }
    async ngOnInit() {
        /* THIS WILL BREAK THE SITE */
        let response = await this.coolHttp.getAsync('api/request');
    }


    /* Component calls (from the HTML view) */
    /**** domainToHexAddress is a Promice, requiring the getBalance call withinthe .then to work correctly  ****/
    loadAddressData(userAddress){ 
        this.loading = true;
        if(userAddress.slice(-1) == 'h'){
            this.web3serv.domainToHexLookup(userAddress).then((hexAddr) =>
            { 
                this.getBalance(hexAddr);     
            })
        }
        else{
           this.getBalance(userAddress)
        }
    }

    /* Balance call, grabs account balance from etherum node */
    getBalance(userAddr){
        this.web3serv.getBalance(userAddr).then((response) => {
            this.userBalance = response / 1000000000000000000;
            this.userAddress = userAddr;

        });
        this.getAddressTransactions(userAddr).then((response: EtherScanTransactionDataModel) => {
            for(var i = 0; i < response.result.length; i++){
                this.userTransactionData.push(response.result[i]);  
            }
        });

    }


    /* Test Etherscan API */
    getAddressTransactions(userAddress: string){
            return this.http.get('https://api.etherscan.io/api?module=account&action=txlist&address='
            + userAddress + '&startblock=0&endblock='+this.web3serv.getCurrentBlock+'&sort=desc&apikey=5R3BDH5G62J7PCWIIU7UHT2E4EDS1Z41G5').toPromise();
    }
}



