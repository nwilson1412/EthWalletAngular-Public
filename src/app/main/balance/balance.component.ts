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
    userBalance: number;
    userTransactionData: any = [];
    error: string;
    userTransactionCount: number;
    userAddress: any;
    // userBlockNumber: number;
    // userBlockData: any;
    // currentBLockNumber: number;
    // currentBlockData: any;
    // ethAddress: any;

    constructor(
        private http: HttpClient,
        private web3serv: Web3Service,
    ){ }
    
   ngOnInit():void {

   }

   resetStats(){
        this.error = null;
        this.addressInput = null
        this.userBalance = null;
        this.userTransactionData = [];
        this.userAddress = null;
        
   }

    /* Component calls (from the HTML view) */
    /**** domainToHexAddress is a Promice, requiring the getBalance call withinthe .then to work correctly  ****/
    
    loadAddressData(){
        this.error = null;
        this.userTransactionData = [];
        this.userBalance = null;
        this.userAddress = null;
        this.userTransactionCount = null;
        try{
            //looks for 'h' because it's the last charactor of an ENS name
            
            if(this.addressInput.slice(-1) == 'h'){
                this.web3serv.domainToHexLookup(this.addressInput).then((hexAddr) =>
                { 
                    this.userAddress = hexAddr;   
                    this.getBalance(hexAddr);
                      
                }).catch((error) => {
                    console.log(error);
                    this.error = error;
                });
            }
            else{
               this.userAddress = this.addressInput;   
               this.getBalance(this.addressInput);

            }
        }catch(error){
            this.userAddress = null;
            this.error = error;
        }
        
        
    }
    

    /* Balance call, grabs account balance from ethereum node */
    getBalance(userAddr){
        this.web3serv.getBalance(userAddr).then((response) => {
            this.userBalance = response / 1000000000000000000;
        }).catch((error) => {
            console.log(error);
            this.error = error;
        });
        this.getAddressTransactions(userAddr).then((response: EtherScanTransactionDataModel) => {
            for(var i = 0; i < response.result.length; i++){
                this.userTransactionData.push(response.result[i]);  
                this.addressInput = '';
            }
            this.userTransactionCount = response.result.length;
        }).catch((error) => {
            console.log(error);
            this.error = error;
        });

    }


    /* Test Etherscan API */
    getAddressTransactions(userAddress: string){
            //using etherscan ropsten API
            //return this.http.get('https://api.etherscan.io/api?module=account&action=txlist&address='
            return this.http.get('https://api-ropsten.etherscan.io/api?module=account&action=txlist&address='
            + userAddress + '&startblock=0&endblock='+this.web3serv.getCurrentBlock+'&sort=desc&apikey=5R3BDH5G62J7PCWIIU7UHT2E4EDS1Z41G5').toPromise();
    }
}



