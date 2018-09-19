import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
    encryptPw: string; 
    userBalance: number;
    userNTKBalance: any;
    userTXcount: number;
    error: string;
    ntkBalContract: any;

    downloadJsonHref: any;

    constructor(
        private web3serv: Web3Service,
        private modalService: NgbModal,
        private sanitizer: DomSanitizer
    ){
        //allows calls in browser console
        //window["homeConsole"] = this;

    }

    generateAccount(){
        this.web3serv.createAccount().then((response: EthAccountModel) => {
            this.generatedAccount = response;
           // this.generatedAccount = this.generatedAccount.encrypt("Test");
            
            this.encryptPk();
            this.encryptPw = null;
            //console.log(this.generatedAccount,this.generatedAccount.address);
            
        });
    }

    generateAndEncrypt(){
        this.generateAccount();
      //  this.generatedAccount.encrypt(this.encryptPw);
     //   this.encryptPw = null;
        
    }

    clearAccount(){
        this.userNTKBalance = null;
        this.userBalance = null;
        this.generatedAccount = null;
        
    }

    revealPrivateKey(){
        const modal = this.modalService.open(PkRevealModal).componentInstance;
        modal.privateKey = this.generatedAccount.privateKey;
    }

    encryptPrivateKey(){
        var x = this.generatedAccount.encrypt("test");
        x = JSON.stringify(x)
        console.log(x)
        var uri:SafeUrl = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(x));
        this.downloadJsonHref = uri;
    }

    encryptPk()
    {
        //console.log(this.web3serv.encryptAccount(this.generatedAccount.privateKey, "test"));
        this.web3serv.encryptAccount(this.generatedAccount.privateKey, "test").then((response) => {
            var encryptedPK = response
            this.encryptPrivateKey();
            console.log(encryptedPK);
        });
    }

    decryptPk(){
        this.web3serv.decryptAccount(this.generatedAccount.privateKey, "test").then((response) => {
            console.log(response);
        });

    }

    importPrivateKey() {
        this.web3serv.pkToAccount(this.importedPrivateKey).then((response: EthAccountModel) => {
            this.generatedAccount = response; 
        });
        this.importedPrivateKey = null;
    }

    getBalance(){
        this.web3serv.getBalance(this.generatedAccount.address).then((response) => {
            this.userBalance = response / 1000000000000000000;
            console.log("(web.component)User balance", this.userBalance)
        });
        this.web3serv.getTxAmount(this.generatedAccount.address).then((response) => {
            this.userTXcount = response;
            console.log("(wallet.component)User Tx Count (Nounce)", this.userTXcount);
        })

      //  this.ntkBalContract = this.web3serv.ntkInitialization(this.generatedAccount.address)
       // this.ntkBalContract.methods.balanceOf(this.generatedAccount.address).call().then((response) => {
       //     this.userNTKBalance = response;
       //     console.log("(wallet.conponent)Balance of NTK:", this.userNTKBalance);
       // });       
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

