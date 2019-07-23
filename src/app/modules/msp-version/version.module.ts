import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../../core/core.module';
import { MspAppVersionRoutingModule } from './version-routing.module';
import { MspDirectAppVersionComponent } from './page/app-version/app-version.component';

@NgModule({
    imports: [CommonModule, MspAppVersionRoutingModule, CoreModule],
    declarations: [MspDirectAppVersionComponent],
})
export class MspDirectVersionModule {}
