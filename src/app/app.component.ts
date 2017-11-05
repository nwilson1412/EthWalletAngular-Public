import { Component } from '@angular/core';
import Web3 from 'web3';
var web3 = new Web3();
window.console.log(web3);



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'Ether Wallet';

}