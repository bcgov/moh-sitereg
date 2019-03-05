import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MspRegisterOrganizationComponent } from './components/msp-register-organization/msp-register-organization.component';
import { MspRegisterComponent } from './msp-register.component';
import { MspRegisterAccessAdminsComponent } from './components/msp-register-access-admins/msp-register-access-admins.component';
import { MspRegisterAuthorizeComponent } from './components/msp-register-authorize/msp-register-authorize.component';
import { MspRegisterSigningAuthorityComponent } from './components/msp-register-signing-authority/msp-register-signing-authority.component';
import { MspRegisterGroupNumbersComponent } from './components/msp-register-group-numbers/msp-register-group-numbers.component';
import { MspRegisterUsersComponent } from './components/msp-register-users/msp-register-users.component';

export const subRoutes: Routes = [
  {
    path: 'organization',
    component: MspRegisterOrganizationComponent,
    data: { title: 'Register Organization'}
  },
  {
    path: 'signing-authority',
    component: MspRegisterSigningAuthorityComponent,
    data: { title: 'Signing Authority'}
  },
  {
    path: 'access-admins',
    component: MspRegisterAccessAdminsComponent,
    data: { title: 'Access Admins'}
  },
  {
    path: 'users',
    component: MspRegisterUsersComponent,
    data: { title: 'Users'}
  },
  {
    path: 'group-numbers',
    component: MspRegisterGroupNumbersComponent,
    data: { title: 'Group Numbers'}
  },
  {
    path: 'register-authorize',
    component: MspRegisterAuthorizeComponent,
    data: { title: 'Authorize'}
  },
];

const routes: Routes = [{
  path: '',
  component: MspRegisterComponent,
  children: subRoutes,
  },


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MspRegisterRoutingModule { }
