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
        this.updateStateService.hasOrganizationUpdates = bool;
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
            administeringFor: [null, Validators.required] // the ONLY required field
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
        if (!this.organizationForm) {
            // user can continue only if they select 'No'
            return this.updateStateService.hasOrganizationUpdates === false;
        }
        return this.organizationForm.valid;
    }

    get organizationForm(): FormGroup {
        return this.updateStateService.forms.organizationForm;
    }

    /** For template. */
    get hasOrgUpdates(): boolean {
        return this.updateStateService.hasOrganizationUpdates;
    }


    // get hasOrgUpdates(): boolean {
    //     return !!this.organizationForm;
    // }
}
