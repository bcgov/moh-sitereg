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


        MspRegisterUserMspComponent,
        MspRegisterUserComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CaptchaModule,
        RouterModule,
        MspDirectUpdateRoutesModule,
        SharedCoreModule
    ],
    providers: [
      MspDirectUpdateProgressService,
      { provide: AbstractPgCheckService, useExisting: MspDirectUpdateProgressService },
      RouteGuardService
    ]
})
export class MspDirectUpdateModule {}
