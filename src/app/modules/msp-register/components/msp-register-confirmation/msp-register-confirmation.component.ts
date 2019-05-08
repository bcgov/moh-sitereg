import { Component, OnInit } from '@angular/core';
import { MspRegisterDataService } from '@msp-register/services/msp-register-data.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { LoggerService } from '@shared/services/logger.service';
import { MSP_REGISTER_ROUTES } from '@msp-register/constants';
import { MspRegistrationService } from '@msp-register/msp-registration.service';
// import { environment } from '

@Component({
    selector: 'sitereg-msp-register-confirmation',
    templateUrl: './msp-register-confirmation.component.html',
    styleUrls: ['./msp-register-confirmation.component.scss'],
})
export class MspRegisterConfirmationComponent implements OnInit {
    status = false;
    showDetail = false;
    isTechnicalInfoAvaialble = false;
    debugMode = environment.debug;

    constructor(
        private router: Router,
        public mspRegDataSvc: MspRegisterDataService,
        private globalConfigSvc: GlobalConfigService,
        public loggerSvc: LoggerService,
        private registrationService: MspRegistrationService
    ) {}

    ngOnInit() {
        this.status =
            this.mspRegDataSvc.requestFinalStatus &&
            this.mspRegDataSvc.requestFinalStatus.status
                ? this.mspRegDataSvc.requestFinalStatus.status
                : false;
        this.isTechnicalInfoAvaialble = this.mspRegDataSvc.requestFinalStatus
            ? true
            : false;

            // splunk-log
        this.loggerSvc.logNavigation(
            this.constructor.name,
            `Confirmation Page loaded. ${this.globalConfigSvc.applicationId}`
        );
    }

    toggleDetail() {
        this.showDetail = !this.showDetail;
    }

    redirect() {
        this.mspRegDataSvc.requestFinalStatus = null;
        this.registrationService.enableConfirmation = false;
        this.router.navigate([MSP_REGISTER_ROUTES.ORGANIZATION.fullpath]);
    }
}
