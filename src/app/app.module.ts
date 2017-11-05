import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {AppRoutingModule} from './routing.module';
import {MainModule} from './main/main.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        MainModule,
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
