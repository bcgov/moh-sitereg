import { Routes } from '@angular/router';
import { MspRegisterOrganizationComponent } from '@msp-register/components/msp-register-organization/msp-register-organization.component';
// tslint:disable-next-line: max-line-length
import { MspRegisterSigningAuthorityComponent } from '@msp-register/components/msp-register-signing-authority/msp-register-signing-authority.component';
import { MspRegisterAccessAdminsComponent } from '@msp-register/components/msp-register-access-admins/msp-register-access-admins.component';
import { MspRegisterUsersComponent } from '@msp-register/components/msp-register-users/msp-register-users.component';
import { MspRegisterGroupComponent } from '@msp-register/components/msp-register-group/msp-register-group.component';
import { MspRegisterAuthorizeComponent } from '@msp-register/components/msp-register-authorize/msp-register-authorize.component';

export const subRoutes: Routes = [
    {
        path: 'organization',
        component: MspRegisterOrganizationComponent,
        data: { title: 'Register Organization' },
    },
    {
        path: 'signing-authority',
        component: MspRegisterSigningAuthorityComponent,
        data: { title: 'Signing Authority' },
    },
    {
        path: 'access-admins',
        component: MspRegisterAccessAdminsComponent,
        data: { title: 'Access Admins' },
    },
    {
        path: 'users',
        component: MspRegisterUsersComponent,
        data: { title: 'Users' },
    },
    {
        path: 'group-numbers',
        component: MspRegisterGroupComponent,
        data: { title: 'MSP Groups' },
    },
    {
        path: 'authorize',
        component: MspRegisterAuthorizeComponent,
        data: { title: 'Authorize' },
    },

    // REMOVEME
    // Testing - moving default to group numbers for testing only
    {
        path: '',
        redirectTo: 'group-numbers',
    },
];
