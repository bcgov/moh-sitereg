import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { Router } from '@angular/router';
import { validMultiFormControl } from '@msp-register/models/validator-helpers';
import { MspRegisterDataService } from '@msp-register/services/msp-register-data.service';
import { IMspAccessAdmin } from '@msp-register/interfaces/i-msp-access-admins';
import { cAdministeringFor } from '@msp-register/models/core/core-types';
import { BehaviorSubject } from 'rxjs';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import {
    funcRemoveStrings,
    MSP_REGISTER_ROUTES,
} from '@msp-register/constants';
import { MspRegistrationService } from '@msp-register/msp-registration.service';

@Component({
    selector: 'sitereg-msp-register-access-admins',
    templateUrl: './msp-register-access-admins.component.html',
    styleUrls: ['./msp-register-access-admins.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MspRegisterAccessAdminsComponent implements OnInit {
    fgs: FormGroup[];
    validFormControl: () => boolean;
    validFormGroup = this.mspRegisterStateSvc.validFormGroup;
    administeringFor: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
        cAdministeringFor
    );

    constructor(
        private router: Router,
        public loggerSvc: LoggerService,
        private globalConfigSvc: GlobalConfigService,
        public mspRegisterStateSvc: MspRegisterStateService,
        public mspRegDataSvc: MspRegisterDataService,
        private registrationService: MspRegistrationService
    ) {
        this.updateFormGroups();
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

        this.router.navigate([MSP_REGISTER_ROUTES.USERS.fullpath]);
    }

    addFormGroup() {
        this.mspRegisterStateSvc.addAdmin();
        this.updateFormGroups();
    }

    updateFormGroups() {
        this.fgs = this.mspRegisterStateSvc.mspRegisterAccessAdminsForm;
    }

    deleteFormGroup(i: number) {
        this.mspRegisterStateSvc.removeAdmin(i);
        this.updateFormGroups();
    }

    // REMOVEME - debug only
    debugOnly() {
        if (!this.globalConfigSvc.isProduction) {
            const accessAdmins: IMspAccessAdmin[] = [];
            this.mspRegisterStateSvc.mspRegisterAccessAdminsForm.forEach((v) =>
                v.value ? accessAdmins.push(v.value) : ''
            );

            const moAccessAdministrators = this.mspRegDataSvc.mapAccessAdministratorDef(
                accessAdmins
            );
            console.log(
                `%c middleware object <= %o\n\t%o`,
                'color:lightgreen',
                funcRemoveStrings(
                    ['MspRegister', 'Component'],
                    this.constructor.name
                ),
                moAccessAdministrators
            );
        }
    }
}
