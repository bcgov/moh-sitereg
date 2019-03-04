import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MspRegisterModule } from './modules/msp-register/msp-register.module';
import { SharedCoreModule } from 'moh-common-lib';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    MspRegisterModule,
    SharedCoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
