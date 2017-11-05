import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule} from './routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule
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
