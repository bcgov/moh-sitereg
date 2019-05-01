import { Routes } from '@angular/router';
import { MspRegisterOrganizationComponent } from '@msp-register/components/msp-register-organization/msp-register-organization.component';
// tslint:disable-next-line: max-line-length
import { MspRegisterSigningAuthorityComponent } from '@msp-register/components/msp-register-signing-authority/msp-register-signing-authority.component';
import { MspRegisterAccessAdminsComponent } from '@msp-register/components/msp-register-access-admins/msp-register-access-admins.component';
import { MspRegisterUsersComponent } from '@msp-register/components/msp-register-users/msp-register-users.component';
import { MspRegisterGroupComponent } from '@msp-register/components/msp-register-group/msp-register-group.component';
import { MspRegisterAuthorizeComponent } from '@msp-register/components/msp-register-authorize/msp-register-authorize.component';
import { MSP_REGISTERATION_ROUTES } from './constants';
import { MspRegistrationCompleteComponent } from './components/msp-registration-complete/msp-registration-complete.component';
import { MspRegisterAutofillComponent } from './components/autofill/autofill.component';

export const subRoutes: Routes = [
    {
        // path: 'organization',
        path: MSP_REGISTERATION_ROUTES.ORGANIZATION.path,
        component: MspRegisterOrganizationComponent,
        data: { title: MSP_REGISTERATION_ROUTES.ORGANIZATION.title },
    },
    {
        // path: 'signing-authority',
        path: MSP_REGISTERATION_ROUTES.SIGNING_AUTHORITY.path,
        component: MspRegisterSigningAuthorityComponent,
        data: { title: MSP_REGISTERATION_ROUTES.SIGNING_AUTHORITY.title },
    },
    {
        // path: 'access-admins',
        path: MSP_REGISTERATION_ROUTES.ACCESS_ADMINS.path,
        component: MspRegisterAccessAdminsComponent,
        data: { title: MSP_REGISTERATION_ROUTES.ACCESS_ADMINS.title },
    },
    {
        // path: 'users',
        path: MSP_REGISTERATION_ROUTES.USERS.path,
        component: MspRegisterUsersComponent,
        data: { title: MSP_REGISTERATION_ROUTES.USERS.title },
    },
    {
        // path: 'group-numbers',
        path: MSP_REGISTERATION_ROUTES.GROUP_NUMBERS.path,
        component: MspRegisterGroupComponent,
        data: { title: MSP_REGISTERATION_ROUTES.GROUP_NUMBERS.title },
    },
    {
        // path: 'authorize',
        path: MSP_REGISTERATION_ROUTES.AUTHORIZE.path,
        component: MspRegisterAuthorizeComponent,
        data: { title: MSP_REGISTERATION_ROUTES.AUTHORIZE.title },
    },

    //REMOVEME 
    {
        // path: 'authorize',
        path: 'complete',
        component: MspRegistrationCompleteComponent,
        data: { title: 'complete' },
    },
    {
        // path: 'authorize',
        path: '_autofill',
        component: MspRegisterAutofillComponent,
        data: { title: 'autofill' },
    },
];
