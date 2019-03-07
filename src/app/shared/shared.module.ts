import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCoreModule } from 'moh-common-lib';
import { CoreBreadcrumbComponent } from 'moh-common-lib/lib/components/core-breadcrumb/core-breadcrumb.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PageSectionsComponent } from './components/page-sections/page-sections.component';

@NgModule({
  declarations: [PageSectionsComponent],
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
  ]
})
export class SharedModule { }
