import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MspRegisterRoutingModule } from './msp-register-routing.module';
import { MspRegisterComponent } from '@msp-register/msp-register.component';
import { SharedModule } from '@shared/shared.module';
import { MspRegisterOrganizationComponent } from './components/msp-register-organization/msp-register-organization.component';
import { MspRegisterAccessAdminsComponent } from './components/msp-register-access-admins/msp-register-access-admins.component';
import { MspRegisterAuthorizeComponent } from './components/msp-register-authorize/msp-register-authorize.component';
import { MspRegisterGroupComponent } from './components/msp-register-group/msp-register-group.component';
import { MspRegisterSigningAuthorityComponent } from './components/msp-register-signing-authority/msp-register-signing-authority.component';
import { MspRegisterUsersComponent } from './components/msp-register-users/msp-register-users.component';
import { MspRegisterPersonComponent } from './components/msp-register-person/msp-register-person.component';
import { MspRegisterAuthorizeAccessComponent } from './components/msp-register-authorize-access/msp-register-authorize-access.component';
import { MspRegisterUserMspComponent } from './components/core/msp-register-user-msp/msp-register-user-msp.component';
import { MspRegisterUserComponent } from './components/core/msp-register-user/msp-register-user.component';

@NgModule({
    declarations: [
        MspRegisterComponent,
        MspRegisterUserComponent,
        MspRegisterOrganizationComponent,
        MspRegisterAccessAdminsComponent,
        MspRegisterAuthorizeComponent,
        MspRegisterGroupComponent,
        MspRegisterSigningAuthorityComponent,
        MspRegisterUsersComponent,
        MspRegisterPersonComponent,
        MspRegisterAuthorizeAccessComponent,
        MspRegisterUserMspComponent,
    ],
    imports: [CommonModule, SharedModule, MspRegisterRoutingModule],
    exports: [MspRegisterAuthorizeAccessComponent],
})
export class MspRegisterModule {}
