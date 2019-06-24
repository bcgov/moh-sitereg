import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { ROUTES_UPDATE } from '../../routing/routes.constants';
import { funcRemoveStrings } from '@msp-register/constants';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UpdateStateService } from '../../services/update.state.service';
import { AbstractForm } from 'moh-common-lib';
import { cUpdateValidators } from '@msp-register/models/core/core-types';

@Component({
    selector: 'sitereg-msp-update-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.scss'],
})
export class MspDirectUpdateOrganizationComponent extends AbstractForm implements OnInit {
    // TODO: REmove boolean and just check if the form is null?
    public hasOrgUpdates: boolean;

    constructor(
        public router: Router,
        private progressService: MspDirectUpdateProgressService,
        private loggerSvc: LoggerService,
        private globalConfigSvc: GlobalConfigService,
        private fb: FormBuilder,
        public updateStateService: UpdateStateService,
    ) {
        super(router);
        // TODO - REMOVE!  Currently using `hasOrgUpdates` boolean instead. Desireable?
        // this.updateStateService.forms.organizationForm = this.fb.group({
        //     hasOrgInfoUpdates: [null, Validators.required],
        // }, { updateOn: 'blur' });
    }

    ngOnInit() {
        this.progressService.setPageIncomplete();
    }

    orgUpdatesChange(bool: boolean) {
        console.log('orgUpdatesChange', bool);
        this.hasOrgUpdates = bool;
        if (bool) {
            this.createFormGroup();
        } else {
            this.destroyFormGroup();
        }
    }

    createFormGroup(): void {
        this.updateStateService.forms.organizationForm = this.fb.group({
            name: [null, cUpdateValidators.organizationName],
            suite: [null],
            street: [null, cUpdateValidators.street],
            streetName: [null],
            addressLine2: [null, cUpdateValidators.addressLine2],
            city: [null, cUpdateValidators.city],
            province: [null, cUpdateValidators.province],
            postalCode: [null, cUpdateValidators.postalCode],
            administeringFor: [Validators.required] // the ONLY required field
        });

    }

    destroyFormGroup(): void {
        this.updateStateService.forms.organizationForm = null;
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
        this.router.navigate([ROUTES_UPDATE.SIGNING_AUTHORITY.fullpath]);
    }

    canContinue(): boolean {
        return false;
    }

    get organizationForm(): FormGroup {
        return this.updateStateService.forms.organizationForm;
    }
}
