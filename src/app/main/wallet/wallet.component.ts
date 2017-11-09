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

    constructor(
        private web3serv: Web3Service,
        private modalService: NgbModal
    ){

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
    //    this.web3serv.encryptAccount(this.generatedAccount.privateKey, 'test').then((response: EncryptedEthAccountModel) => {
    //         console.log(response);
    //     });
    }

    importPrivateKey() {
        try{
            this.web3serv.pkToAccount(this.importedPrivateKey).then((response: EthAccountModel) => {
                this.generatedAccount = response;
                // if(this.isAddress(response.address)){
                //     this.generatedAccount = response;                    
                // }else{
                //     alert("Invalid private key");
                // }
            });
        }catch(err){
            console.log(err);
        }
        this.importedPrivateKey = null;
    }

    // isAddress(address) {
    //     // function isAddress(address) {
    //         if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    //         // check if it has the basic requirements of an address
    //         return false;
    //     } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
    //         // If it's all small caps or all all caps, return "true
    //         return true;
    //     } else {
    //         // Otherwise check each case
    //         return this.isChecksumAddress(address);
    //     }
    // }
    
    
    // isChecksumAddress(address) {
    //     // Check each case
    //     address = address.replace('0x','');
    //     var addressHash = this.web3serv.web3Connection.sha3(address.toLowerCase());
    //     for (var i = 0; i < 40; i++ ) {
    //         // the nth letter should be uppercase if the nth digit of casemap is 1
    //         if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }
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

