import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { LoggerService } from '@shared/services/logger.service';
import { MSP_REGISTER_ROUTES } from '@msp-register/constants';
import { UpdateStateService } from '../../services/update.state.service';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'sitereg-msp-update-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.scss'],
})
export class MspDirectUpdateConfirmationComponent implements OnInit {
    status = false;
    showDetail = false;
    isTechnicalInfoAvaialble = false;
    debugMode = false;
    today: number = Date.now();
    constructor(
        private router: Router,
        private globalConfigSvc: GlobalConfigService,
        public loggerSvc: LoggerService,
        public updateStateService: UpdateStateService,
    ) {
        // this.debugonly();
        this.debugMode = this.globalConfigSvc.debug;
        // this.mockSuccess();
        this.debugMode = environment.debug;
    }

    ngOnInit() {
        this.updateStateService.enableConfirmation = true;
        this.status =
            this.updateStateService.requestFinalStatus &&
                this.updateStateService.requestFinalStatus.status
                ? this.updateStateService.requestFinalStatus.status
                : false;
        this.isTechnicalInfoAvaialble = this.updateStateService.requestFinalStatus
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
        this.updateStateService.requestFinalStatus = null;
        this.updateStateService.enableConfirmation = false;
        this.router.navigate([MSP_REGISTER_ROUTES.ORGANIZATION.fullpath]);
    }

    paddedConfirmationNumber() {
        if (this.status === true && this.updateStateService.requestFinalStatus) {
            const confirmationNumber = this.updateStateService.requestFinalStatus.confirmationNumber as string;
            const paddedQty = 8 - confirmationNumber.length;
            return paddedQty > 0 ? '0'.repeat(paddedQty) + confirmationNumber : confirmationNumber;
        }
        return null;
    }

    debugonly() {
        this.status = true;
        this.isTechnicalInfoAvaialble = true;
        this.updateStateService.enableConfirmation = true;
    }

    mockSuccess() {

        this.status = true;
        const requestStatus = {
            referenceId: null,
            status: false,
            confirmationNumber: null,
            schema: '',
            response: null,
            exception: null,
            statuscode: null
        };

        if (requestStatus.exception === null) {
            requestStatus.status = true;
        } else {
            requestStatus.status = false;
        }

        requestStatus.response = '';
        requestStatus.referenceId = this.updateStateService.applicationId;

        const result = '';
        if (result && requestStatus.exception === null) {
            if (
                requestStatus.response.op_return_code &&
                requestStatus.response.op_return_code === 'SUCCESS'
            ) {
                requestStatus.confirmationNumber =
                    requestStatus.response.op_reference_number;
            } else {
                requestStatus.status = false;
            }
        }

        this.updateStateService.requestFinalStatus = requestStatus;
        this.updateStateService.enableConfirmation = true;
    }
}
