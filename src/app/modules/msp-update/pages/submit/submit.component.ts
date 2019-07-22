import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { ROUTES_UPDATE } from '../../routing/routes.constants';
import { funcRemoveStrings, MSP_REGISTER_ROUTES } from '@msp-register/constants';
import { LoggerService, LogMessage } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { environment } from '../../../../../environments/environment.prod';
import { MspRegisterApiService } from '../../../../shared/services/api.service';
import { UpdateStateService } from '../../services/update.state.service';
import { MspUpdateApiService } from '../../services/api.service';
import { jsonPayLoadApplication } from './json-payload';

@Component({
    selector: 'sitereg-msp-update-submit',
    templateUrl: './submit.component.html',
    styleUrls: ['./submit.component.scss'],
})
export class MspDirectUpdateSubmitComponent implements OnInit {

    requestUUID: string;
    // tslint:disable-next-line:variable-name
    private _hasToken = false;
    // public isProcessing = false;
    date: Date = new Date();

    captchaApiBaseUrl: string;
    nonce: string;
    showCaptcha = false;
    validCaptch = false;
    isProcessing = false;

    get componentInfo(): string {
        return (
            `${funcRemoveStrings(
                ['MspDirectUpdate', 'Component'],
                this.constructor.name
            ).toUpperCase()} :` + ` ${this.globalConfigSvc.applicationId}`
        );
    }

    constructor(
        private router: Router,
        private progressService: MspDirectUpdateProgressService,
        private loggerSvc: LoggerService,
        private globalConfigSvc: GlobalConfigService,
        // public apiSvc: MspRegisterApiService,
        public mspUpdateApiSvc: MspUpdateApiService,
        public updateStateService: UpdateStateService,
    ) {

        this.captchaApiBaseUrl = environment.captchaApiBaseUrl;
        this.requestUUID = this.nonce = this.globalConfigSvc.applicationId;
        this.updateStateService.applicationId = this.requestUUID;

        // console.log(
        //     '%c %o %o %o',
        //     'color:red',
        //     this.requestUUID,
        //     this.globalConfigSvc.applicationId,
        //     this.updateStateService.applicationId
        // );

    }

    // /** Use the UUID as a cryptographic client nonce to avoid replay attacks. */
    // get nonce(): string {
    //     return this.globalConfigSvc.applicationId;
    // }

    setToken(token): void {
        this._hasToken = true;
        this.validCaptch = true;
        this.mspUpdateApiSvc.setCaptchaToken(token);
    }

    ngOnInit() {
        // console.log(`%c%o : %o`, 'color:green', this.componentInfo);
        this.progressService.setPageIncomplete();
    }

    continue() {



        // splunk-log
        this.loggerSvc.logNavigation(
            this.constructor.name,
            `Valid Data - Continue button clicked. ${
            this.globalConfigSvc.applicationId
            }`
        );
        this.submit();
        // this.progressService.enableConfirmation = true;
        // this.progressService.setPageComplete();
        // this.router.navigate([ROUTES_UPDATE.CONFIRMATION.fullpath]);
    }

    canContinue() {

        return this._hasToken;
    }

    json() {
        // this.updateStateService.applicationId = this.updateStateService.applicationId;
        // this.updateStateService.applicationId = this.globalConfigSvc.applicationId;
        return jsonPayLoadApplication(this.updateStateService);
    }


    submit() {
        console.clear();
        this.isProcessing = true;
        // // splunk-log
        // this.loggerSvc.logNavigation(
        //     this.constructor.name,
        //     `Valid Data - Continue button clicked. ${
        //     this.globalConfigSvc.applicationId
        //     }`
        // );

        // this.registrationService.setItemComplete();

        // REMOVEME debug-only
        // this.debugOnly();

        const middleWareObject = this.updateObject();

        // // console.log(
        //     `%c middleware object <= %o\n\t%o`,
        //     'color:lightgreen',
        //     funcRemoveStrings(
        //         ['MspRegister', 'Component'],
        //         this.constructor.name
        //     ),
        //     middleWareObject
        // );

        // this.copyJsonSchema(middleWareObject);

        this.updateStateService.requestFinalStatus = null;
        const requestStatus = {
            referenceId: null,
            status: false,
            confirmationNumber: null,
            schema: middleWareObject,
            response: null,
            exception: null,
            statuscode: null
        };

        this.mspUpdateApiSvc
            .siteUpdateRequest(
                middleWareObject,
                this.date.toDateString(),
                this.requestUUID
            )
            .toPromise()
            .catch((err) => {

                // console.log(`result: %c %o`, 'color:organge', err);
                this.loggerSvc.logError({
                    event: 'http-exception',
                    exceptionMessage: `${err}`,
                } as LogMessage);
                this.loggerSvc.logHttpError(err);
                requestStatus.exception = err;
                requestStatus.statuscode = err.status ? err.status : '';
                this.isProcessing = false;
            })
            .then((result) => {
                // // console.log(`result: %c %o`, 'color:organge', result);
                // // console.log(`requestStatus: %c %o`, 'color:organge', requestStatus);

                this.loggerSvc.logNavigation(
                    'middleware-request-status:',
                    'completed'
                );

                if (requestStatus.exception === null) {
                    requestStatus.status = true;
                } else {
                    requestStatus.status = false;
                }

                requestStatus.response = result;
                requestStatus.referenceId = this.requestUUID;

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

                this.progressService.enableConfirmation = true;
                this.progressService.setPageComplete();

                this.updateStateService.requestFinalStatus = requestStatus;

                this.isProcessing = false;
                this.updateStateService.enableConfirmation = true;
                this.router.navigate([
                    ROUTES_UPDATE.CONFIRMATION.fullpath,
                ]);
            });
    }

    updateObject() {
        return this.json();
    }
}
