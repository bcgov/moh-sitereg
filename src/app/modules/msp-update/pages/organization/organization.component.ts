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
import { cUpdateValidators, cAdministeringForUpdate } from '@msp-register/models/core/core-types';

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
        public updateStateService: UpdateStateService,
    ) {
        super(router);
    }

    ngOnInit() {
        this.progressService.setPageIncomplete();
    }

    

    // createFormGroup(): void {
    //     this.updateStateService.forms.organizationForm = this.fb.group({
    //         name: [null, cUpdateValidators.organizationName],
    //         suite: [null],
    //         street: [null, cUpdateValidators.street],
    //         streetName: [null],
    //         addressLine2: [null, cUpdateValidators.addressLine2],
    //         city: [null, cUpdateValidators.city],
    //         province: [null, cUpdateValidators.province],
    //         postalCode: [null, cUpdateValidators.postalCode],
    //         // the ONLY required field, and comes with a default value
    //         administeringFor: [cAdministeringForUpdate[0], Validators.required]

    //     });

    // }

    // destroyFormGroup(): void {
    //     this.updateStateService.forms.organizationForm = null;
    // }

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
        // if (!this.organizationForm) {
        //     // user can continue only if they select 'No'
        //     return this.updateStateService.hasOrganizationUpdates === false;
        // }
        // return this.organizationForm.valid;
        return true;
    }

    // get organizationForm(): FormGroup {
    //     return this.updateStateService.forms.organizationForm;
    // }

    //#region NEW

    orgUpdatesChange(bool: boolean) {
        this.hasOrganizationUpdates = bool;
    }

    get hasOrganizationUpdates(): boolean {
        return this.updateStateService.hasOrganizationUpdates;
    }
    set hasOrganizationUpdates(value) {
        this.updateStateService.hasOrganizationUpdates = value;
        if (value && value === true) {
            console.log('has organization udpates - create form');
            // this.createFormGroup();
        } else {
            console.log('NO organization udpates - destroy form');
            // this.destroyFormGroup();
        }
    }

    get formOrganizationState(): FormGroup {
        return this.updateStateService.forms.organizationForm;
    }

    //#endregion
}
