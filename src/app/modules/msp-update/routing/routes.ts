import { Routes } from '@angular/router';
import { ROUTES_UPDATE } from './routes.constants';
import { MspDirectUpdateIdentifyComponent } from '../components/identify/identify.component';
import { MspDirectUpdateOrganizationComponent } from '../components/organization/organization.component';
import { MspDirectUpdateSigningAuthorityComponent } from '../components/signing-authority/signing-authority.component';
import { MspDirectUpdateAccessAdministratorComponent } from '../components/access-administrator/access-administrator.component';
import { MspDirectUpdateUsersComponent } from '../components/users/users.component';
import { MspDirectUpdateGroupsComponent } from '../components/groups/groups.component';
import { MspDirectUpdateSubmitComponent } from '../components/submit/submit.component';
import { MspDirectUpdateAutofillComponent } from '../components/autofill/autofill.component';
import { MspDirectUpdateConfirmationComponent } from '../components/confirmation/confirmation.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: ROUTES_UPDATE.IDENTIFY.path,
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
    },
    {
        // path: 'signing-authority',
        path: ROUTES_UPDATE.SIGNING_AUTHORITY.path,
        component: MspDirectUpdateSigningAuthorityComponent,
        data: { title: ROUTES_UPDATE.SIGNING_AUTHORITY.title },
    },
    {
        // path: 'access-admins',
        path: ROUTES_UPDATE.ACCESS_ADMINS.path,
        component: MspDirectUpdateAccessAdministratorComponent,
        data: { title: ROUTES_UPDATE.ACCESS_ADMINS.title },
    },
    {
        // path: 'users',
        path: ROUTES_UPDATE.USERS.path,
        component: MspDirectUpdateUsersComponent,
        data: { title: ROUTES_UPDATE.USERS.title },
    },
    {
        // path: 'group-numbers',
        path: ROUTES_UPDATE.GROUP_NUMBERS.path,
        component: MspDirectUpdateGroupsComponent,
        data: { title: ROUTES_UPDATE.GROUP_NUMBERS.title },
    },
    {
        // path: 'Submit',
        path: ROUTES_UPDATE.SUBMIT.path,
        component: MspDirectUpdateSubmitComponent,
        data: { title: ROUTES_UPDATE.SUBMIT.title },
    },
    {
        // path: 'confirmation',
        path: ROUTES_UPDATE.CONFIRMATION.path,
        component: MspDirectUpdateConfirmationComponent,
        data: { title: ROUTES_UPDATE.CONFIRMATION.title },
    },

    // REMOVEME
    {
        // path: 'autofill',
        path: '_autofill',
        component: MspDirectUpdateAutofillComponent,
        data: { title: 'autofill' },
    },
    // ,
    // { path: '**', component: MspDirectUpdateIdentifyComponent },
];
