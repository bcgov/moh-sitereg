import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCoreModule } from 'moh-common-lib';
import { CoreBreadcrumbComponent } from 'moh-common-lib/lib/components/core-breadcrumb/core-breadcrumb.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PageSectionsComponent } from './components/page-sections/page-sections.component';
import { CaptchaComponent } from 'mygovbc-captcha-widget/src/app/captcha/captcha.component';
import { CaptchaDataService } from 'mygovbc-captcha-widget/src/app/captcha-data.service';

@NgModule({
  declarations: [PageSectionsComponent],
  imports: [
    CommonModule,
    SharedCoreModule,
    FormsModule,
    ReactiveFormsModule,
    CaptchaComponent,
  ],
  exports: [
    SharedCoreModule,
    ReactiveFormsModule,
    PageSectionsComponent,
    CaptchaComponent,
  ],
  providers: [CaptchaDataService]
})
export class SharedModule { }
