import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
        
    ],

    exports: [
        BalanceComponent,
        WalletComponent
    ],
  
    providers: [],

})
export class MainModule {}
