import { Component } from '@angular/core';

// Services
import { Web3Service } from '../../services/web3.service';

@Component({
    selector: 'wallet-view',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css']
})
export class WalletComponent {

    constructor(private web3serv: Web3Service){

    }

    generateAccount(){
        this.web3serv.createAccount().then((response) => {

        });
    }

}

export class EthAccountModel{
    address: string;
    privateKey: string;
    signTransaction: (tx: EthTransactionModel) => any;
    sign: (data: any) => any;
    encrypt: (password: any) => any;
}

export class EthTransactionModel{
    to: string;
    value: string;
    gas: number;
}

export class EncryptedAccountModel{
    version: number;
    id: string;
    address: string;
    crypto: {
    }
}

export class KdfParams{

}

