import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// Components
import {PkRevealModal} from '../../components/modals/pkRevealModal.component';

// Services
import { Web3Service } from '../../services/web3.service';

@Component({
    selector: 'wallet-view',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css']
})
export class WalletComponent {

    generatedAccount: EthAccountModel; 
    importedPrivateKey: string;
    userBalance: number;
    error: string;
    

    constructor(
        private web3serv: Web3Service,
        private modalService: NgbModal
    ){
        //allows calls in browser console
        window["homeConsole"] = this;
    }

    generateAccount(){
        this.web3serv.createAccount().then((response: EthAccountModel) => {
            this.generatedAccount = response;
            console.log(response);
        });
    }

    revealPrivateKey(){
        const modal = this.modalService.open(PkRevealModal).componentInstance;
        modal.privateKey = this.generatedAccount.privateKey;
    }

    encryptPrivateKey(){
        var textFile = null;
        var data = new Blob([this.generatedAccount.privateKey], {type: 'text/plain'});
        textFile = window.URL.createObjectURL(data);
        var a = document.getElementById('hiddenLink');
        window.open(textFile);
        
    // Can't run without Node Crypt 
    //    this.web3serv.encryptAccount(this.generatedAccount.privateKey, 'test').then((response: EncryptedEthAccountModel) => {
    //         console.log(response);
    //     });
    }

    importPrivateKey() {
        try{
            this.web3serv.pkToAccount(this.importedPrivateKey).then((response: EthAccountModel) => {
                console.log("Step 1", response)
                this.generatedAccount = response;
                this.getBalance();
                

            });
        }catch(err){
            console.log(err);
        }
        this.importedPrivateKey = null;
    }

    getBalance(){
        this.web3serv.getBalance(this.generatedAccount.address).then((response) => {
            this.userBalance = response / 1000000000000000000;
            console.log("Step 2.", this.userBalance)
        }).catch((error) => {
            console.log(error);
            this.error = error;
        })
    };
}


//#region models
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

export class EncryptedEthAccountModel{
    version: number;
    id: string;
    address: string;
    crypto: EthCryptoModel;
}

export class EthCryptoModel{
    ciphertext: string;
    cipherparams: { iv: string; };
    cipher: string;
    kdf: string;
    kdfparams: EthKdfParamsModel;
    mac: string;
}

export class EthKdfParamsModel{
    dklen: number;
    salt: string;
    n: number;
    r: number;
    p: number;
}
//#endregion

