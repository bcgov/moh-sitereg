import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MspRegisterRoutingModule } from './msp-register-routing.module';
import { MspRegisterComponent } from '@msp-register/msp-register.component';
import { SharedModule } from '@shared/shared.module';
import { MspRegisterOrganizationComponent } from './components/msp-register-organization/msp-register-organization.component';

@NgModule({
  declarations: [
    MspRegisterComponent,
    MspRegisterOrganizationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MspRegisterRoutingModule
  ],
  exports: []
})
export class MspRegisterModule { }
