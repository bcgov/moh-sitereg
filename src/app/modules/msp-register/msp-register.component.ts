import { Component, OnInit } from '@angular/core';
import { Container } from 'moh-common-lib/models';
import { subRoutes } from '@msp-register/models/sub-routes';
import { Router } from '@angular/router';
import { GlobalConfigService } from '@shared/services/global-config.service';

@Component({
    selector: 'sitereg-msp-register',
    templateUrl: './msp-register.component.html',
    styleUrls: ['./msp-register.component.scss'],
})
export class MspRegisterComponent extends Container implements OnInit {
    constructor(
        private router: Router,
        private globalConfigSvc: GlobalConfigService
    ) {
        super();
        this.setProgressSteps(subRoutes);

        this.globalConfigSvc.logRefreshMspApplicationUUID();
        console.log(`Application UUID: %o`, this.globalConfigSvc.applicationId);
    }

    ngOnInit() {
        // this.router.navigate(['msp-registration/organization']);
    }
}
