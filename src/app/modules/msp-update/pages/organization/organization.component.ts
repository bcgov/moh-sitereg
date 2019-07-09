import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MspDirectUpdateOrganizationEditComponent } from './organization-edit/organization-edit.component';

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
        return this.hasOrganizationUpdates === false ? true :
            (this.formOrganizationState ? this.formOrganizationState.valid : false);
    }

    //#region NEW

    // // tslint:disable-next-line: member-ordering
    // @ViewChild(MspDirectUpdateOrganizationEditComponent)
    // formOrganizationEdit: MspDirectUpdateOrganizationEditComponent;


    orgUpdatesChange(bool: boolean) {
        this.hasOrganizationUpdates = bool;
    }

    organizationFormStatusChanged(form: FormGroup | null) {
        // should be form array
        if (form) {
            this.updateStateService.forms.organizationForm = form;
            console.log('Form Status Changed => ' + form.valid );
        }
    }



    get hasOrganizationUpdates(): boolean | null {
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
