import { Component, OnInit } from '@angular/core';
import { Container } from 'moh-common-lib';
import { subRoutes } from '@msp-register/sub-routes';
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
    showStepper(): boolean {
        return !this.registrationService.enableConfirmation;
    }

    constructor(
        private registrationService: MspRegistrationService,
        private router: Router,
        private globalConfigSvc: GlobalConfigService
    ) {
        super();

        this.setProgressItems();
    }

    ngOnInit() {
        // this.globalConfigSvc.logRefreshMspApplicationUUID();
        // console.log(
        //     `%c %o \n MSP Application id: %o`,
        //     'color:green',
        //     funcRemoveStrings(['Component'], this.constructor.name),
        //     this.globalConfigSvc.applicationId
        // );

        this.registrationService.getRegisterationItems();

        // console.log('ANSWER:%o', this.showStepper());
    }

    setProgressItems() {
        const progressItemRoute = subRoutes.filter((x) => {
            return !(x.path.includes('_') || x.path.includes('confirmation'));
        });

        this.setProgressSteps(progressItemRoute);
        // console.log('PATH: %o', this.router.url);
    }
}
