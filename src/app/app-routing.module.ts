import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './core/components/home-page/home-page.component';
import { MspRegisterComponent } from './modules/msp-register/msp-register.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomePageComponent,
    },
    {
        path: 'register',
        loadChildren:
            './modules/msp-register/msp-register.module#MspRegisterModule',
    },
    {
        path: 'update',
        loadChildren:
            './modules/msp-update/update.module#MspDirectUpdateModule',
    },
    {
        path: 'maintenance',
        loadChildren:
            './modules/splash-page/splash-page.module#SplashPageModule',
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
