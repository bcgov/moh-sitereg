import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ROUTES_UPDATE } from '../../../routing/routes.constants';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../../services/progress.service';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { UpdateStateService } from '../../../services/update.state.service';
import { cUpdateValidators, validMultiFormControl } from '../../../common/validators';

import { getJsonOfRequestor } from '../shared/requestor-json-map';


@Component({
    selector: 'sitereg-msp-update-identify',
    templateUrl: './identify.component.html',
    styleUrls: ['./identify.component.scss'],
})
export class MspDirectUpdateIdentifyComponent implements OnInit, AfterViewInit {
    @ViewChild('consentModal') consentModal;
    validFormControl: (fg: FormGroup, name: string) => boolean;
    json: (formValues: any) => any;

    constructor(
        private router: Router,
        private progressService: MspDirectUpdateProgressService,
        private loggerSvc: LoggerService,
        private globalConfigSvc: GlobalConfigService,
        public updateStateService: UpdateStateService,
        private fb: FormBuilder
    ) {
        this.validFormControl = validMultiFormControl;
        this.json = getJsonOfRequestor;
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
}
