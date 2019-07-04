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
import { MspRegisterAutofillComponent } from './components/autofill/autofill.component';
import { MspRegisterConfirmationComponent } from './components/msp-register-confirmation/msp-register-confirmation.component';
import { MspRegisterReviewComponent } from './components/msp-register-review/msp-register-review.component';
import { MspRegisterH2WithPrintComponent } from './common/h2-with-print/h2-with-print.component';

@NgModule({
    declarations: [
        MspRegisterComponent,
        MspRegisterH2WithPrintComponent,

        MspRegisterUserComponent,
        MspRegisterOrganizationComponent,
        MspRegisterAccessAdminsComponent,
        MspRegisterAuthorizeComponent,
        MspRegisterGroupComponent,
        MspRegisterReviewComponent,
        MspRegisterSigningAuthorityComponent,
        MspRegisterUsersComponent,
        MspRegisterAuthorizeAccessComponent,
        MspRegisterUserMspComponent,
        MspRegisterAutofillComponent,
        MspRegisterConfirmationComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        CaptchaModule,
        MspRegisterRoutingModule,
    ],
    providers: [],
    exports: [
      MspRegisterAuthorizeAccessComponent,
      MspRegisterUserMspComponent,
      MspRegisterUserComponent
    ],
})
export class MspRegisterModule {}
