import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './core/components/home-page/home-page.component';
import { MspRegisterComponent } from './modules/msp-register/msp-register.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    data: {title: 'Home'}
  },
  {
    path: 'msp-registration',
    loadChildren: './modules/msp-register/msp-register.module#MspRegisterModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
