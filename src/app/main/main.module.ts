import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { BalanceComponent } from './balance/balance.component';
import { WalletComponent } from './wallet/wallet.component';

@NgModule({
    declarations: [
        HomeComponent,
        BalanceComponent,
        WalletComponent
    ],

    imports: [
        BrowserModule,
        FormsModule,
        CommonModule
    ],

    exports: [
        BalanceComponent,
        WalletComponent
    ],
  
    providers: [],

})
export class MainModule {}
