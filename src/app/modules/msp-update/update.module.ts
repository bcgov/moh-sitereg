import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CaptchaModule } from 'moh-common-lib/captcha';
import { MspDirectUpdateRoutesModule } from './routing/routes.module';
import { MspDirectUpdateComponent } from './components/update-container/update-container.component';
import { MspDirectUpdateIdentifyComponent } from './pages/identify/identify.component';
import { MspDirectUpdateOrganizationComponent } from './pages/organization/organization.component';
import { MspDirectUpdateSigningAuthorityComponent } from './pages/signing-authority/signing-authority.component';
import { MspDirectUpdateAccessAdministratorComponent } from './pages/access-administrator/access-administrator.component';
import { MspDirectUpdateUsersComponent } from './pages/users/users.component';
import { MspDirectUpdateGroupsComponent } from './pages/groups/groups.component';
import { MspDirectUpdateSubmitComponent } from './pages/submit/submit.component';
import { MspDirectUpdateAutofillComponent } from './pages/autofill/autofill.component';
import { MspDirectUpdateConfirmationComponent } from './pages/confirmation/confirmation.component';
import { MspDirectUpdateProgressService } from './services/progress.service';
import { AbstractPgCheckService, RouteGuardService, SharedCoreModule } from 'moh-common-lib';
import { RouterModule } from '@angular/router';
import { MspRegisterUserMspComponent } from '../msp-register/components/core/msp-register-user-msp/msp-register-user-msp.component';
import { MspRegisterUserComponent } from '../msp-register/components/core/msp-register-user/msp-register-user.component';
import { MspRegisterModule } from '../msp-register/msp-register.module';
import { MspUpdateReviewComponent } from './pages/review/review.component';

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
        MspUpdateReviewComponent,

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
