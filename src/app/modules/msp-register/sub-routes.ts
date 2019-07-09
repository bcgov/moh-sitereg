import { Routes } from '@angular/router';
import { MspRegisterOrganizationComponent } from '@msp-register/components/msp-register-organization/msp-register-organization.component';
// tslint:disable-next-line: max-line-length
import { MspRegisterSigningAuthorityComponent } from '@msp-register/components/msp-register-signing-authority/msp-register-signing-authority.component';
import { MspRegisterAccessAdminsComponent } from '@msp-register/components/msp-register-access-admins/msp-register-access-admins.component';
import { MspRegisterUsersComponent } from '@msp-register/components/msp-register-users/msp-register-users.component';
import { MspRegisterGroupComponent } from '@msp-register/components/msp-register-group/msp-register-group.component';
import { MspRegisterAuthorizeComponent } from '@msp-register/components/msp-register-authorize/msp-register-authorize.component';
import { MSP_REGISTER_ROUTES } from './constants';
import { MspRegisterAutofillComponent } from './components/autofill/autofill.component';
import { MspRegisterConfirmationComponent } from './components/msp-register-confirmation/msp-register-confirmation.component';
import { MspRegisterReviewComponent } from './components/msp-register-review/msp-register-review.component';

export const subRoutes: Routes = [
    {
        path: '',
        redirectTo: MSP_REGISTER_ROUTES.ORGANIZATION.path,
    },
    {
        // path: 'organization',
        path: MSP_REGISTER_ROUTES.ORGANIZATION.path,
        component: MspRegisterOrganizationComponent,
        data: { title: MSP_REGISTER_ROUTES.ORGANIZATION.title },
    },
    {
        // path: 'signing-authority',
        path: MSP_REGISTER_ROUTES.SIGNING_AUTHORITY.path,
        component: MspRegisterSigningAuthorityComponent,
        data: { title: MSP_REGISTER_ROUTES.SIGNING_AUTHORITY.title },
    },
    {
        // path: 'access-admins',
        path: MSP_REGISTER_ROUTES.ACCESS_ADMINS.path,
        component: MspRegisterAccessAdminsComponent,
        data: { title: MSP_REGISTER_ROUTES.ACCESS_ADMINS.title },
    },
    {
        // path: 'users',
        path: MSP_REGISTER_ROUTES.USERS.path,
        component: MspRegisterUsersComponent,
        data: { title: MSP_REGISTER_ROUTES.USERS.title },
    },
    {
        // path: 'group-numbers',
        path: MSP_REGISTER_ROUTES.GROUP_NUMBERS.path,
        component: MspRegisterGroupComponent,
        data: { title: MSP_REGISTER_ROUTES.GROUP_NUMBERS.title },
    },
    {
        // path: 'review',
        path: MSP_REGISTER_ROUTES.REVIEW.path,
        component: MspRegisterReviewComponent,
        data: { title: MSP_REGISTER_ROUTES.REVIEW.title },
    },
    {
        // path: 'authorize',
        path: MSP_REGISTER_ROUTES.AUTHORIZE.path,
        component: MspRegisterAuthorizeComponent,
        data: { title: MSP_REGISTER_ROUTES.AUTHORIZE.title },
    },
    {
        // path: 'confirmation',
        path: MSP_REGISTER_ROUTES.CONFIRMATION.path,
        component: MspRegisterConfirmationComponent,
        data: { title: MSP_REGISTER_ROUTES.CONFIRMATION.title },
    },

    // // REMOVEME
    // {
    //     // path: 'autofill',
    //     path: '_autofill',
    //     component: MspRegisterAutofillComponent,
    //     data: { title: 'autofill' },
    // },
];
