import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CaptchaModule } from 'moh-common-lib/captcha';
import { MspDirectUpdateRoutesModule } from './routing/routes.module';
import { MspDirectUpdateComponent } from './components/update-container/update-container.component';
import {
    MspDirectUpdateReviewContainerComponent
} from './common/msp-direct-update-review-container/msp-direct-update-review-container.component';


import { MspDirectUpdateRequestorComponent } from './pages/requestor/requestor/requestor.component';
import { MspDirectUpdateRequestorReviewComponent } from './pages/requestor/requestor-review/requestor-review.component';

import { MspDirectUpdateOrganizationComponent } from './pages/organization/organization.component';
import { MspDirectUpdateOrganizationEditComponent } from './pages/organization/organization-edit/organization-edit.component';
import { MspDirectUpdateOrganizationReviewComponent } from './pages/organization/organization-review/organization-review.component';

import { MspDirectUpdateSigningAuthorityComponent } from './pages/signing-authority/signing-authority/signing-authority.component';
import {
    MspDirectUpdateSigningAuthorityRemoveComponent
} from './pages/signing-authority/signing-authority-remove/signing-authority-remove.component';
import {
    MspDirectUpdateSigningAuthorityAddComponent
} from './pages/signing-authority/signing-authority-add/signing-authority-add.component';
import {
    MspDirectUpdateSigningAuthorityEditComponent
} from './pages/signing-authority/signing-authority-edit/signing-authority-edit.component';

import { MspDirectUpdateAccessAdministratorComponent } from './pages/access-admin/access-admin/access-admin.component';
import { MspDirectUpdateAccessAdministratorRemoveComponent } from './pages/access-admin/access-admin-remove/access-admin-remove.component';
import { MspDirectUpdateAccessAdministratorAddComponent } from './pages/access-admin/access-admin-add/access-admin-add.component';
import { MspDirectUpdateAccessAdministratorEditComponent } from './pages/access-admin/access-admin-edit/access-admin-edit.component';

import { MspDirectUpdateUserComponent } from './pages/user/user/user.component';
import { MspDirectUpdateUserRemoveComponent } from './pages/user/user-remove/user-remove.component';
import { MspDirectUpdateUserAddComponent } from './pages/user/user-add/user-add.component';
import { MspDirectUpdateUserEditComponent } from './pages/user/user-edit/user-edit.component';
import { MspDirectUpdateUserReviewComponent } from './pages/user/user-review/user-review.component';

import { MspDirectUpdateGroupComponent } from './pages/group/group/group.component';
import { MspDirectUpdateGroupRemoveComponent } from './pages/group/group-remove/group-remove.component';
import { MspDirectUpdateGroupAddComponent } from './pages/group/group-add/group-add.component';
import { MspDirectUpdateGroupEditComponent } from './pages/group/group-edit/group-edit.component';

import { MspDirectUpdateSubmitComponent } from './pages/submit/submit.component';
import { MspDirectUpdateConfirmationComponent } from './pages/confirmation/confirmation.component';
import { MspDirectUpdateProgressService } from './services/progress.service';
import { AbstractPgCheckService, RouteGuardService, SharedCoreModule } from 'moh-common-lib';
import { RouterModule } from '@angular/router';

import { MspRegisterModule } from '../msp-register/msp-register.module';
import { MspUpdateReviewComponent } from './pages/review/review.component';
import { ReviewSectionComponent } from './components/review-section/review-section.component';
import { MspDirectUpdateErrorBoxComponent } from './common/error-update-error-box/error-update-error-box.component';
import { JsonUpdateViewComponent } from './common/json-update-view/json-update-view.component';

@NgModule({
    declarations: [

        MspDirectUpdateErrorBoxComponent,
        MspDirectUpdateReviewContainerComponent,

        MspDirectUpdateComponent,

        MspDirectUpdateRequestorComponent,
        MspDirectUpdateRequestorReviewComponent,

        MspDirectUpdateOrganizationComponent,
        MspDirectUpdateOrganizationEditComponent,
        MspDirectUpdateOrganizationReviewComponent,

        MspDirectUpdateSigningAuthorityComponent,
        MspDirectUpdateSigningAuthorityRemoveComponent,
        MspDirectUpdateSigningAuthorityAddComponent,
        MspDirectUpdateSigningAuthorityEditComponent,

        MspDirectUpdateAccessAdministratorComponent,
        MspDirectUpdateAccessAdministratorRemoveComponent,
        MspDirectUpdateAccessAdministratorAddComponent,
        MspDirectUpdateAccessAdministratorEditComponent,

        MspDirectUpdateUserComponent,
        MspDirectUpdateUserRemoveComponent,
        MspDirectUpdateUserAddComponent,
        MspDirectUpdateUserEditComponent,
        MspDirectUpdateUserReviewComponent,

        MspDirectUpdateUserComponent,

        MspDirectUpdateGroupComponent,
        MspDirectUpdateGroupRemoveComponent,
        MspDirectUpdateGroupAddComponent,
        MspDirectUpdateGroupEditComponent,

        MspDirectUpdateSubmitComponent,
        MspDirectUpdateConfirmationComponent,
        MspUpdateReviewComponent,
        ReviewSectionComponent,
        JsonUpdateViewComponent,
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
