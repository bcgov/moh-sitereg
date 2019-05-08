import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { Router } from '@angular/router';
import { validMultiFormControl } from '@msp-register/models/validator-helpers';
import { MspRegisterDataService } from '@msp-register/services/msp-register-data.service';
import { IMspGroup, IMspOrganization } from '@msp-register/interfaces';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { funcRemoveStrings, MSP_REGISTER_ROUTES } from '@msp-register/constants';
import { MspRegistrationService } from '@msp-register/msp-registration.service';

@Component({
    selector: 'sitereg-msp-register-group',
    templateUrl: './msp-register-group.component.html',
    styleUrls: ['./msp-register-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MspRegisterGroupComponent implements OnInit {
    fgs: FormGroup[] = [];
    validFormControl: () => boolean;
    validFormGroup = this.mspRegisterStateSvc
        .MspRegisterGroupFormNumbersContinueValid;

    public get organization(): IMspOrganization {
        return this.mspRegisterStateSvc.organization;
    }
    constructor(
        private router: Router,
        public loggerSvc: LoggerService,
        private globalConfigSvc: GlobalConfigService,
        public mspRegisterStateSvc: MspRegisterStateService,
        public mspRegDataSvc: MspRegisterDataService,
        private registrationService: MspRegistrationService
    ) {
        this.updateFormGroups();
        this.addDefaultFormGroup();
        this.validFormControl = validMultiFormControl.bind(this);

        // // debug only
        // this.fgs.forEach((fg) => {
        //     fg.valueChanges.subscribe((obs) => console.log(fg));
        // });
    }

    ngOnInit() {
        console.log(
            `%c%o : %o`,
            'color:green',
            funcRemoveStrings(
                ['MspRegister', 'Component'],
                this.constructor.name
            ).toUpperCase(),
            this.globalConfigSvc.applicationId
        );
        this.registrationService.setItemIncomplete();
    }

    continue() {
        // splunk-log
        this.loggerSvc.logNavigation(
            this.constructor.name,
            'Valid Data - Continue button clicked.'
        );
        this.registrationService.setItemComplete();

        // REMOVEME debug-only
        this.debugOnly();

        this.router.navigate([MSP_REGISTER_ROUTES.AUTHORIZE.fullpath]);
    }

    addDefaultFormGroup(): void {
        if ( this.fgs && this.fgs.length === 0 ) {
            this.addFormGroup();
            this.updateFormGroups();
        }
    }

    addFormGroup() {
        this.mspRegisterStateSvc.addGroup();
        this.updateFormGroups();
    }

    updateFormGroups() {
        this.fgs = this.mspRegisterStateSvc.mspRegisterGroupForm;
    }

    deleteFormGroup(i: number) {
        this.mspRegisterStateSvc.removeGroup(i);
        this.updateFormGroups();
    }

    // REMOVEME - debug only
    debugOnly() {
        if (this.globalConfigSvc.currentEnironment.production === false) {
            // Msp Groups
            const mspGroups: IMspGroup[] = [];
            this.mspRegisterStateSvc.mspRegisterGroupForm.forEach((v) =>
                v.value ? mspGroups.push(v.value) : ''
            );

            // Orgnaization Info
            const moOrganizationInformation = this.mspRegDataSvc.mapOrgInformation(
                this.mspRegisterStateSvc.mspRegisterOrganizationForm.value
            );

            const isThirdPartyManamentAllowed = this.mspRegDataSvc.isThirdyPartyManagmentEnabled(
                moOrganizationInformation
            );
            const middleWareObject = this.mspRegDataSvc.mapGroupDef(
                mspGroups,
                isThirdPartyManamentAllowed
            );
            console.log(
                `%c middleware object <= %o\n\t%o`,
                'color:lightgreen',
                funcRemoveStrings(
                    ['MspRegister', 'Component'],
                    this.constructor.name
                ),
                middleWareObject
            );
        }
    }
}
