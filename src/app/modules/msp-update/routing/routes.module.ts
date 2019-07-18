import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { MspDirectUpdateComponent } from '../components/update-container/update-container.component'
import { routes } from './routes';


const moduleRoutes: Routes = [
    {
        path: '',
        component: MspDirectUpdateComponent,
        children: routes
        // canActivateChild: [MspRegistrationGuard],
    },
];
@NgModule({
    imports: [RouterModule.forChild(moduleRoutes)],
    providers: [GlobalConfigService],
    exports: [RouterModule],
})
export class MspDirectUpdateRoutesModule {}
