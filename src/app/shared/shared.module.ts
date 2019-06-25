import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCoreModule } from 'moh-common-lib';
import { CaptchaModule } from 'moh-common-lib/captcha';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ErrorBoxComponent } from './components/error-box/error-box.component';
import { GlobalConfigService } from './services/global-config.service';
import { MspRegisterApiService } from './services/api.service';
import { LoggerService } from './../shared/services/logger.service';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MspGroupNoComponent } from './components/msp-group-no/msp-group-no.component';
import { MspH2WithPrintComponent } from './components/h2-with-print/h2-with-print.component';
import { OrganizationFormComponent } from './components/organization-form/organization-form.component';

@NgModule({
    declarations: [
      ErrorBoxComponent,
      MspGroupNoComponent,
      MspH2WithPrintComponent,
      OrganizationFormComponent,
    ],
    imports: [
        CommonModule,
        SharedCoreModule,
        FormsModule,
        ReactiveFormsModule,
        CaptchaModule,
        NgxJsonViewerModule,
    ],
    providers: [GlobalConfigService, MspRegisterApiService, LoggerService],
    exports: [
        SharedCoreModule,
        ReactiveFormsModule,
        CaptchaModule,
        ErrorBoxComponent,
        NgxJsonViewerModule,
        MspGroupNoComponent,
        MspH2WithPrintComponent,
        OrganizationFormComponent,
    ],
})
export class SharedModule {}
