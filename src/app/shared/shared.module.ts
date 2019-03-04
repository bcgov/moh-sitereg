import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCoreModule } from 'moh-common-lib';
import { CoreBreadcrumbComponent } from 'moh-common-lib/lib/components/core-breadcrumb/core-breadcrumb.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedCoreModule,

  ],
  exports: [
    SharedCoreModule,
  ]
})
export class SharedModule { }
