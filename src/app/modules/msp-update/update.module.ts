import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CaptchaModule } from 'moh-common-lib/captcha';
import { MspDirectUpdateRoutesModule } from './routing/routes.module';
import { MspDirectUpdateComponent } from './components/update/update.component';
import { MspDirectUpdateIdentifyComponent } from './components/identify/identify.component';
import { MspDirectUpdateOrganizationComponent } from './components/organization/organization.component';
import { MspDirectUpdateSigningAuthorityComponent } from './components/signing-authority/signing-authority.component';
import { MspDirectUpdateAccessAdministratorComponent } from './components/access-administrator/access-administrator.component';
import { MspDirectUpdateUsersComponent } from './components/users/users.component';
import { MspDirectUpdateGroupsComponent } from './components/groups/groups.component';
import { MspDirectUpdateSubmitComponent } from './components/submit/submit.component';
import { MspDirectUpdateAutofillComponent } from './components/autofill/autofill.component';
import { MspDirectUpdateConfirmationComponent } from './components/confirmation/confirmation.component';
import { MspDirectUpdateProgressService } from './services/progress.service';
import { AbstractPgCheckService, RouteGuardService, SharedCoreModule } from 'moh-common-lib';
import { RouterModule } from '@angular/router';
import { MspRegisterUserMspComponent } from '../msp-register/components/core/msp-register-user-msp/msp-register-user-msp.component';
import { MspRegisterUserComponent } from '../msp-register/components/core/msp-register-user/msp-register-user.component';
import { MspRegisterModule } from '../msp-register/msp-register.module';

@NgModule({
    declarations: [
        MspDirectUpdateComponent,
        MspDirectUpdateIdentifyComponent,
        MspDirectUpdateOrganizationComponent,
        MspDirectUpdateSigningAuthorityComponent,
        MspDirectUpdateAccessAdministratorComponent,
        MspDirectUpdateUsersComponent,
        MspDirectUpdateGroupsComponent,
        MspDirectUpdateSubmitComponent,
        MspDirectUpdateAutofillComponent,
        MspDirectUpdateConfirmationComponent,

    ],
    imports: [
        CommonModule,
        SharedModule,
        CaptchaModule,
        RouterModule,
        MspDirectUpdateRoutesModule,
        SharedCoreModule,

        /** TODO: MspRegisterUserMspComponent & MspRegisterUserComponent should be in the core
         *        or shared. Declaring the component within this module causes the register
         *        page fail when try to navigate to it.
         */
        MspRegisterModule
    ],
    providers: [
      MspDirectUpdateProgressService,
      { provide: AbstractPgCheckService, useExisting: MspDirectUpdateProgressService },
      RouteGuardService
    ]
})
export class MspDirectUpdateModule {}
