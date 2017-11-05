import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule} from './routing.module';
import {MainModule} from './main/main.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';


@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        MainModule
    ],

  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent
  ],
  
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule {}
