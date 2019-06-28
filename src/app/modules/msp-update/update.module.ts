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
import { MspDirectUpdateAccessAdministratorRemoveComponent } from './pages/access-admin/access-admin-remove/access-admin-remove.component';

import { MspDirectUpdateUsersComponent } from './pages/users/users.component';
import { MspDirectUpdateGroupsComponent } from './pages/groups/groups.component';
import { MspDirectUpdateSubmitComponent } from './pages/submit/submit.component';
import { MspDirectUpdateAutofillComponent } from './pages/autofill/autofill.component';
import { MspDirectUpdateConfirmationComponent } from './pages/confirmation/confirmation.component';
import { MspDirectUpdateProgressService } from './services/progress.service';
import { AbstractPgCheckService, RouteGuardService, SharedCoreModule } from 'moh-common-lib';
import { RouterModule } from '@angular/router';

import { MspRegisterModule } from '../msp-register/msp-register.module';
import { MspUpdateReviewComponent } from './pages/review/review.component';
import { ReviewSectionComponent } from './components/review-section/review-section.component';
import { MspUpdateUserComponent } from './pages/core/msp-update-user/msp-update-user.component';

@NgModule({
    declarations: [
        MspUpdateUserComponent,

        MspDirectUpdateComponent,
        MspDirectUpdateIdentifyComponent,
        MspDirectUpdateOrganizationComponent,
        MspDirectUpdateSigningAuthorityComponent,

        MspDirectUpdateAccessAdministratorComponent,
        MspDirectUpdateAccessAdministratorRemoveComponent,

        MspDirectUpdateUsersComponent,
        MspDirectUpdateGroupsComponent,
        MspDirectUpdateSubmitComponent,
        MspDirectUpdateAutofillComponent,
        MspDirectUpdateConfirmationComponent,
        MspUpdateReviewComponent,
        ReviewSectionComponent,
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
