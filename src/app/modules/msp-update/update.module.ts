import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CaptchaModule } from 'moh-common-lib/captcha';
import { MspDirectUpdateRoutesModule } from './routing/routes.module';
import { MspDirectUpdateComponent } from './components/update-container/update-container.component';
import { MspDirectUpdateIdentifyComponent } from './pages/identify/identify.component';

import { MspDirectUpdateOrganizationComponent } from './pages/organization/organization.component';
import { MspDirectUpdateOrganizationEditComponent } from './pages/organization/organization-edit/organization-edit.component';

import { MspDirectUpdateSigningAuthorityComponent } from './pages/signing-authority/signing-authority.component';

import { MspDirectUpdateAccessAdministratorComponent } from './pages/access-admin/access-admin/access-admin.component';
import { MspDirectUpdateAccessAdministratorRemoveComponent } from './pages/access-admin/access-admin-remove/access-admin-remove.component';

import { MspDirectUpdateUserComponent } from './pages/user/user/user.component';

import { MspDirectUpdateGroupComponent } from './pages/group/group/group.component';
import { MspDirectUpdateGroupRemoveComponent } from './pages/group/group-remove/group-remove.component';
import { MspDirectUpdateGroupAddComponent } from './pages/group/group-add/group-add.component';
import { MspDirectUpdateGroupEditComponent } from './pages/group/group-edit/group-edit.component';

import { MspDirectUpdateSubmitComponent } from './pages/submit/submit.component';
import { MspDirectUpdateAutofillComponent } from './pages/autofill/autofill.component';
import { MspDirectUpdateConfirmationComponent } from './pages/confirmation/confirmation.component';
import { MspDirectUpdateProgressService } from './services/progress.service';
import { AbstractPgCheckService, RouteGuardService, SharedCoreModule } from 'moh-common-lib';
import { RouterModule } from '@angular/router';

import { MspRegisterModule } from '../msp-register/msp-register.module';
import { MspUpdateReviewComponent } from './pages/review/review.component';
import { ReviewSectionComponent } from './components/review-section/review-section.component';
import { MspDirectUpdateAccessAdministratorEditComponent } from './pages/access-admin/access-admin-edit/access-admin-edit.component';
import { MspDirectUpdateAccessAdministratorAddComponent } from './pages/access-admin/access-admin-add/access-admin-add.component';
import { MspDirectUpdateErrorBoxComponent } from './common/error-update-error-box/error-update-error-box.component';



@NgModule({
    declarations: [

        MspDirectUpdateErrorBoxComponent,

        MspDirectUpdateComponent,
        MspDirectUpdateIdentifyComponent,
        MspDirectUpdateOrganizationComponent,
        MspDirectUpdateOrganizationEditComponent,
        MspDirectUpdateSigningAuthorityComponent,

        MspDirectUpdateAccessAdministratorComponent,
        MspDirectUpdateAccessAdministratorRemoveComponent,
        MspDirectUpdateAccessAdministratorAddComponent,
        MspDirectUpdateAccessAdministratorEditComponent,

        MspDirectUpdateUserComponent,

        MspDirectUpdateGroupComponent,
        MspDirectUpdateGroupRemoveComponent,
        MspDirectUpdateGroupAddComponent,
        MspDirectUpdateGroupEditComponent,

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
export class MspDirectUpdateModule { }
