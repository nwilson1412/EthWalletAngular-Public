import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './main/home/home.component';
import { BalanceComponent } from './main/balance/balance.component';
import { WalletComponent } from './main/wallet/wallet.component';

 
const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',  component: HomeComponent },
   // { path: 'balance',  component: BalanceComponent },
    { path: 'wallet', component: WalletComponent },
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}