import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MspRegisterOrganizationComponent } from './components/msp-register-organization/msp-register-organization.component';
import { MspRegisterComponent } from './msp-register.component';

export const subRoutes: Routes = [
  {
    path: 'organization',
    component: MspRegisterOrganizationComponent,
    data: { title: 'Register Organization'}
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
