import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MspRegisterDataService } from '@msp-register/services/msp-register-data.service';
import { validMultiFormControl } from '@msp-register/models/validator-helpers';
import { IMspUser } from '@msp-register/interfaces/i-msp-user';
import { cAdministeringFor } from '../../models/core/core-types';
import { LoggerService } from '@shared/services/logger.service';
import { funcRemoveStrings, MSP_REGISTER_ROUTES } from '@msp-register/constants';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { MspRegistrationService } from '@msp-register/msp-registration.service';

@Component({
    selector: 'sitereg-msp-register-users',
    templateUrl: './msp-register-users.component.html',
    styleUrls: ['./msp-register-users.component.scss'],
})
export class MspRegisterUsersComponent implements OnInit {
    fgs: FormGroup[] = [];
    validFormControl: () => boolean;
    validateFormGroup = this.mspRegisterStateSvc.validFormGroup;
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

        // REMOVEME debug-only
        this.debugOnly();
        this.registrationService.setItemComplete();

        this.router.navigate([MSP_REGISTER_ROUTES.GROUP_NUMBERS.fullpath]);
    }

    addFormGroup() {
        this.mspRegisterStateSvc.addUser();
        this.updateFormGroups();
    }

    updateFormGroups() {
        this.fgs = this.mspRegisterStateSvc.mspRegisterUsersForm;
    }

    deleteFormGroup(i: number) {
        this.mspRegisterStateSvc.removeUser(i);
        this.updateFormGroups();
    }

    // REMOVEME - debug only
    debugOnly() {
        // Users
        const mspUsers: IMspUser[] = [];
        this.mspRegisterStateSvc.mspRegisterUsersForm.forEach((v) =>
            v.value ? mspUsers.push(v.value) : ''
        );

        const middleWareObject = this.mspRegDataSvc.mapUserDef(mspUsers);
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
