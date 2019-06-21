import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { MspDirectUpdateComponent } from '../components/update/update.component';
import { routes } from './routes';
import { RouteGuardService } from 'moh-common-lib';


const moduleRoutes: Routes = [
    {
        path: '',
        component: MspDirectUpdateComponent,
        children: routes
    },
];
@NgModule({
    providers: [GlobalConfigService],
    imports: [RouterModule.forChild(moduleRoutes)],
    exports: [RouterModule],
})
export class MspDirectUpdateRoutesModule {}
