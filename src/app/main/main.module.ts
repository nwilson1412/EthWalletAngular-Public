/* 3rd Party modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home/home.component';
import { BalanceComponent } from './balance/balance.component';
import { WalletComponent } from './wallet/wallet.component';

import {PkRevealModal} from '../components/modals/pkRevealModal.component';

import { Web3Service } from '../services/web3.service';


@NgModule({
    declarations: [
        HomeComponent,
        BalanceComponent,
        WalletComponent,
        PkRevealModal
    ],

    entryComponents:[
        PkRevealModal
    ],

    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        NgbModule
    ],

    exports: [],
  
    providers: [
        Web3Service
    ],

})
export class MainModule {}
