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
import { MspRegisterAuthorizeAccessComponent } from './components/msp-register-authorize-access/msp-register-authorize-access.component';
import { MspRegisterUserMspComponent } from './components/core/msp-register-user-msp/msp-register-user-msp.component';
import { MspRegisterUserComponent } from './components/core/msp-register-user/msp-register-user.component';
import { CaptchaModule } from 'moh-common-lib/captcha';
import { MspRegistrationCompleteComponent } from './components/msp-registration-complete/msp-registration-complete.component';
import { MspRegisterAutofillComponent } from './components/autofill/autofill.component';

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
        MspRegisterAuthorizeAccessComponent,
        MspRegisterUserMspComponent,
        MspRegistrationCompleteComponent,
        MspRegisterAutofillComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        CaptchaModule,
        MspRegisterRoutingModule,
    ],
    providers: [],
    exports: [MspRegisterAuthorizeAccessComponent],
})
export class MspRegisterModule {}
