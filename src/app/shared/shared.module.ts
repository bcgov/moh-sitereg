import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCoreModule } from 'moh-common-lib';
import { CoreBreadcrumbComponent } from 'moh-common-lib/lib/components/core-breadcrumb/core-breadcrumb.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PageSectionsComponent } from './components/page-sections/page-sections.component';
import { CaptchaComponent } from './components/captcha/captcha.component';

@NgModule({
  declarations: [PageSectionsComponent, CaptchaComponent],
  imports: [
    CommonModule,
    SharedCoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SharedCoreModule,
    ReactiveFormsModule,
    PageSectionsComponent,
    CaptchaComponent,
  ],
})
export class SharedModule { }
