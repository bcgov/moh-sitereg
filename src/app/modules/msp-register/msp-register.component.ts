import { Component, OnInit } from '@angular/core';
import { Container } from 'moh-common-lib/models';
import { subRoutes } from '@msp-register/models/sub-routes';
import { Router } from '@angular/router';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { funcRemoveStrings } from './constants';
import { MspRegistrationService } from './msp-registration.service';

@Component({
    selector: 'sitereg-msp-register',
    templateUrl: './msp-register.component.html',
    styleUrls: ['./msp-register.component.scss'],
})
export class MspRegisterComponent extends Container implements OnInit {
    constructor(
        private registrationService: MspRegistrationService,
        private router: Router,
        private globalConfigSvc: GlobalConfigService
    ) {
        super();
        this.setProgressSteps(subRoutes);
    }

    ngOnInit() {
        // this.globalConfigSvc.logRefreshMspApplicationUUID();
        console.log(
            `%c %o \n MSP Application id: %o`,
            'color:green',
            funcRemoveStrings(['Component'], this.constructor.name),
            this.globalConfigSvc.applicationId
        );

        // Registration items to be completed
        this.registrationService.registrationItems = subRoutes.map(page => {
            if (page.path !== '') {
                return {
                    route: page.path,
                    isComplete: false
                };
            }
        }).filter(x => x);
    }
}
