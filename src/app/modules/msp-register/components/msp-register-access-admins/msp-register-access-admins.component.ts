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
    // get validForms() {
    //     if (!this.fgs) return false;
    //     return this.mspRegisterStateSvc.validFormGroup(this.fgs);
    // }

    constructor(
        private router: Router,
        public loggerSvc: LoggerService,
        private globalConfigSvc: GlobalConfigService,
        public mspRegisterStateSvc: MspRegisterStateService,
        public mspRegDataSvc: MspRegisterDataService
    ) {
        this.updateFormGroups();
        this.validFormControl = validMultiFormControl.bind(this);

        // // debug only
        // this.fgs.forEach((fg) => {
        //     fg.valueChanges.subscribe((obs) => console.log(fg));
        // });
    }

    ngOnInit() {}

    continue() {
        this.loggerSvc.logNavigation(this.constructor.name, 'ValidForm' );
        this.debugOnly();
        this.router.navigate(['msp-registration/users']);
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

    debugOnly() {
        if (this.globalConfigSvc.currentEnironment.production === false) {
            // Access Administrators
            const accessAdmins: IMspAccessAdmin[] = [];
            this.mspRegisterStateSvc.mspRegisterAccessAdminsForm.forEach((v) =>
                v.value ? accessAdmins.push(v.value) : ''
            );

            const moAccessAdministrators = this.mspRegDataSvc.mapAccessAdministratorDef(
                accessAdmins
            );
            console.log('MO - Access Admins:', moAccessAdministrators);
        }
    }
}
