import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ROUTES_UPDATE } from '../../../routing/routes.constants';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../../services/progress.service';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { UpdateStateService } from '../../../services/update.state.service';
import { cUpdateValidators, validMultiFormControl } from '../../../common/validators';

import { getJSONofRequestor } from '../shared/requestor-json-map';
import { IDataForm, RandomObjects } from '../../../common/i-dataform';
import { environment } from 'src/environments/environment.prod';


@Component({
    selector: 'sitereg-msp-update-requestor',
    templateUrl: './requestor.component.html',
    styleUrls: ['./requestor.component.scss'],
})
export class MspDirectUpdateRequestorComponent implements OnInit, AfterViewInit, IDataForm {
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
        this.json = getJSONofRequestor;
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

        const form = this.fb.group({
            organizationNumber: ['', cUpdateValidators.requestorInformation.organizationNumber],
            emailAddress: ['', cUpdateValidators.requestorInformation.emailAddress]
        });
        this.patchValue(form);
        return form;
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

    patchValue(formGroup) {
        if (!environment.useDummyData) return;
        formGroup.patchValue(RandomObjects.getRequestor('RequestorInformation'));
    }
}
