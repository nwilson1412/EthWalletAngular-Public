import { Component } from '@angular/core';
//import Web3 from 'web3';


/*
var Web3 = new Web3(new Web3.providers.HttpProvider("http://58.7.40.25:8546"));
this.web3.isConnected();
window.console.log(Web3.HttpProvider);

import Web3 from 'web3';
var web3 = new Web3(new Web3.providers.HttpProvider("http://58.7.40.25:8546"));
this.web3.isConnected();
console.log(web3.HttpProvider);

let web3:Web3 = new Web3();
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} /** set the provider you want from Web3.providers 
else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
*/



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'Ether Wallet';

}