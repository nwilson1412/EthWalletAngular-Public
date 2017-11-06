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

    gethBlock = {
        difficulty: '',
        gasLimit: '', 
        };

    constructor(){

    }

    ngOnInit():void {

    //this.web3 = getweb3();
    this.web3 = new Web3(new Web3.providers.HttpProvider("http://58.7.40.25:8546"))
    //this.web3 = new web3p.providers.HttpProvider("http://58.7.40.25:8546");

   // this.web3.eth.gethBlock

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


