import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCoreModule } from 'moh-common-lib';
import { CaptchaModule } from 'moh-common-lib/captcha';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PageSectionsComponent } from './components/page-sections/page-sections.component';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { ErrorBoxComponent } from './components/error-box/error-box.component';
import { GlobalConfigService } from './services/global-config.service';
import { MspRegisterApiService } from './services/api.service';

@NgModule({
    declarations: [PageSectionsComponent, CaptchaComponent, ErrorBoxComponent],
    imports: [
        CommonModule,
        SharedCoreModule,
        FormsModule,
        ReactiveFormsModule,
        CaptchaModule,
    ],
    providers: [GlobalConfigService, MspRegisterApiService],
    exports: [
        SharedCoreModule,
        ReactiveFormsModule,
        PageSectionsComponent,
        CaptchaComponent,
        ErrorBoxComponent,
    ],
})
export class SharedModule {}
