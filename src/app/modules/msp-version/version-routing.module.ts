import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MspDirectAppVersionComponent } from './page/app-version/app-version.component';

const routes: Routes = [
    {
        path: '',
        component: MspDirectAppVersionComponent,
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MspAppVersionRoutingModule {}
