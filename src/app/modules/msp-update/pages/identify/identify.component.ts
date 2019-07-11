import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ROUTES_UPDATE } from '../../routing/routes.constants';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { UpdateStateService } from '../../services/update.state.service';
import { cUpdateValidators, validMultiFormControl } from '../../common/validators';
import { funcRandomNumber8Digit, getDateinMMDDYYYY } from '../../common/update-validators';

import * as jsonMaps from '../../common/update-json-map';

@Component({
    selector: 'sitereg-msp-update-identify',
    templateUrl: './identify.component.html',
    styleUrls: ['./identify.component.scss'],
})
export class MspDirectUpdateIdentifyComponent implements OnInit, AfterViewInit {
    @ViewChild('consentModal') consentModal;
    validFormControl: (fg: FormGroup, name: string) => boolean;

    constructor(
        private router: Router,
        private progressService: MspDirectUpdateProgressService,
        private loggerSvc: LoggerService,
        private globalConfigSvc: GlobalConfigService,
        public updateStateService: UpdateStateService,
        private fb: FormBuilder
    ) {
        this.validFormControl = validMultiFormControl;
    }

    ngOnInit() {
        if (!this.updateStateService.forms.requestorForm) {
            this.updateStateService.forms.requestorForm = this.createForm();
        }
        this.progressService.setPageIncomplete();
    }

    ngAfterViewInit() {
        if (!this.updateStateService.hasConsentedToInformationCollection) {
            this.consentModal.showFullSizeView();
        }
    }

    createForm(): FormGroup {
        return this.fb.group({
            organizationNumber: ['', cUpdateValidators.requestorInformation.organizationNumber],
            emailAddress: ['', cUpdateValidators.requestorInformation.emailAddress]
        });
    }

    continue() {
        // splunk-log
        this.loggerSvc.logNavigation(
            this.constructor.name,
            `Valid Data - Continue button clicked. ${
            this.globalConfigSvc.applicationId
            }`
        );

        this.progressService.setPageComplete();
        this.router.navigate([ROUTES_UPDATE.ORGANIZATION.fullpath]);
    }


    onAcceptCollectionNotice(accepted: boolean) {
        this.updateStateService.hasConsentedToInformationCollection = accepted;
    }

    get fg(): FormGroup {
        return this.updateStateService.forms.requestorForm;
    }

    generateJSON(formValues) {
        // generate signing-authorityistrator-remove object
        const json: any = {};
        // from form
        json.org_num = formValues && formValues.organizationNumber ? formValues.organizationNumber : '';
        json.org_email = formValues && formValues.emailAddress ? formValues.emailAddress : '';

        json.request_uuid = this.globalConfigSvc.applicationId;
        json.request_num = funcRandomNumber8Digit();
        json.authorizedBySA = 'Y';
        const dated = new Date();
        json.authorizedDate = getDateinMMDDYYYY(dated);
        json.applicationType = 'mspdUpdate';
        // if (isValidOptionalField(formValues.ministryUserId)) json.user_id = formValues.ministryUserId;
        return json;
    }
}
