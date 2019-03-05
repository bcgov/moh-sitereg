import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MspRegisterRoutingModule } from './msp-register-routing.module';
import { MspRegisterComponent } from '@msp-register/msp-register.component';
import { SharedModule } from '@shared/shared.module';
import { MspRegisterOrganizationComponent } from './components/msp-register-organization/msp-register-organization.component';
import { MspRegisterAccessAdminsComponent } from './components/msp-register-access-admins/msp-register-access-admins.component';
import { MspRegisterAuthorizeComponent } from './msp-register-authorize/msp-register-authorize.component';
import { MspRegisterGroupNumbersComponent } from './msp-register-group-numbers/msp-register-group-numbers.component';
import { MspRegisterSigningAuthorityComponent } from './msp-register-signing-authority/msp-register-signing-authority.component';
import { MspRegisterUsersComponent } from './msp-register-users/msp-register-users.component';

@NgModule({
  declarations: [
    MspRegisterComponent,
    MspRegisterOrganizationComponent,
    MspRegisterAccessAdminsComponent,
    MspRegisterAuthorizeComponent,
    MspRegisterGroupNumbersComponent,
    MspRegisterSigningAuthorityComponent,
    MspRegisterUsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MspRegisterRoutingModule
  ],
  exports: []
})
export class MspRegisterModule { }
