import { Routes } from '@angular/router';
import { ROUTES_UPDATE } from './routes.constants';
import { MspDirectUpdateIdentifyComponent } from '../pages/identify/identify.component';
import { MspDirectUpdateOrganizationComponent } from '../pages/organization/organization.component';
import { MspDirectUpdateSigningAuthorityComponent } from '../pages/signing-authority/signing-authority.component';
import { MspDirectUpdateAccessAdministratorComponent } from '../pages/access-admin/access-admin/access-admin.component';
import { MspDirectUpdateUserComponent } from '../pages/user/user/user.component';
import { MspDirectUpdateGroupComponent } from '../pages/group/group/group.component';
import { MspDirectUpdateSubmitComponent } from '../pages/submit/submit.component';
import { MspDirectUpdateAutofillComponent } from '../pages/autofill/autofill.component';
import { MspDirectUpdateConfirmationComponent } from '../pages/confirmation/confirmation.component';
import { RouteGuardService } from 'moh-common-lib';
import { MspUpdateReviewComponent } from '../pages/review/review.component';
import { environment } from '../../../../environments/environment';

let defaultRoutes: Routes = [
    {
        path: '',
        redirectTo: ROUTES_UPDATE.ACCESS_ADMINS.path,
    },
    {
        // path: 'organization',
        path: ROUTES_UPDATE.IDENTIFY.path,
        component: MspDirectUpdateIdentifyComponent,
        data: { title: ROUTES_UPDATE.IDENTIFY.title },
    },

    {
        // path: 'organization',
        path: ROUTES_UPDATE.ORGANIZATION.path,
        component: MspDirectUpdateOrganizationComponent,
        data: { title: ROUTES_UPDATE.ORGANIZATION.title },
        canActivate: [RouteGuardService]
    },
    {
        // path: 'signing-authority',
        path: ROUTES_UPDATE.SIGNING_AUTHORITY.path,
        component: MspDirectUpdateSigningAuthorityComponent,
        data: { title: ROUTES_UPDATE.SIGNING_AUTHORITY.title },
        canActivate: [RouteGuardService]
    },
    {
        // path: 'access-admins',
        path: ROUTES_UPDATE.ACCESS_ADMINS.path,
        component: MspDirectUpdateAccessAdministratorComponent,
        data: { title: ROUTES_UPDATE.ACCESS_ADMINS.title },
        canActivate: [RouteGuardService]
    },
    {
        // path: 'users',
        path: ROUTES_UPDATE.USERS.path,
        component: MspDirectUpdateUserComponent,
        data: { title: ROUTES_UPDATE.USERS.title },
        canActivate: [RouteGuardService]
    },
    {
        // path: 'group-numbers',
        path: ROUTES_UPDATE.GROUP_NUMBERS.path,
        component: MspDirectUpdateGroupComponent,
        data: { title: ROUTES_UPDATE.GROUP_NUMBERS.title },
        canActivate: [RouteGuardService]
    },
    {
        // path: 'Review',
        path: ROUTES_UPDATE.REVIEW.path,
        component: MspUpdateReviewComponent,
        data: { title: ROUTES_UPDATE.REVIEW.title }
    },
    {
        // path: 'Submit',
        path: ROUTES_UPDATE.SUBMIT.path,
        component: MspDirectUpdateSubmitComponent,
        data: { title: ROUTES_UPDATE.SUBMIT.title },
        canActivate: [RouteGuardService]
    },
    {
        // path: 'confirmation',
        path: ROUTES_UPDATE.CONFIRMATION.path,
        component: MspDirectUpdateConfirmationComponent,
        data: { title: ROUTES_UPDATE.CONFIRMATION.title },
    },

    // // REMOVEME
    // {
    //     // path: 'autofill',
    //     path: '_autofill',
    //     component: MspDirectUpdateAutofillComponent,
    //     data: { title: 'autofill' },
    // },

    // { path: '**', component: MspDirectUpdateIdentifyComponent },
];

if (environment.bypassGuards || true ) {
    console.log('DEVELOPMENT ONLY - BYPASSING ROUTE GUARDS');
    defaultRoutes = defaultRoutes.map(x => {
        x.canActivate = [];
        return x;
    });
}


export const routes = defaultRoutes;
