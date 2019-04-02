import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCoreModule } from 'moh-common-lib';
import { CoreBreadcrumbComponent } from 'moh-common-lib/lib/components/core-breadcrumb/core-breadcrumb.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PageSectionsComponent } from './components/page-sections/page-sections.component';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { ErrorBoxComponent } from './components/error-box/error-box.component';
// import { CaptchaComponent } from './components/captcha/captcha.component';
// import { CaptchaModule } from 'moh-common-lib/captcha';
// import {  CaptchaModule  } from 'moh-common-lib/captcha/moh-common-lib-captcha';

@NgModule({
    declarations: [PageSectionsComponent, CaptchaComponent, ErrorBoxComponent],
    imports: [CommonModule, SharedCoreModule, FormsModule, ReactiveFormsModule],
    exports: [
        SharedCoreModule,
        ReactiveFormsModule,
        PageSectionsComponent,
        CaptchaComponent,
        ErrorBoxComponent,
    ],
})
export class SharedModule {}
