import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
// import { MspRegistrationService } from '@msp-register/msp-registration.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CoreModule,
        SharedModule,
    ],
    providers: [
        // MspRegistrationService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
