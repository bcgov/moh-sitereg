import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MspRegisterComponent } from './msp-register.component';
import { subRoutes } from './models/sub-routes';
import { GlobalConfigService } from '@shared/services/global-config.service';

const routes: Routes = [
    {
        path: '',
        component: MspRegisterComponent,
        children: subRoutes,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [GlobalConfigService],
    exports: [RouterModule],
})
export class MspRegisterRoutingModule {}
