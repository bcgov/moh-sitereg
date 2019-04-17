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
        this.loggerSvc.logNavigation(
            this.constructor.name,
            'valid data - continue clicked'
        );
        this.logMiddleWareObjects();
        this.router.navigate(['msp-registration/group-numbers']);
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

    logMiddleWareObjects() {
        // Users
        const mspUsers: IMspUser[] = [];
        this.mspRegisterStateSvc.mspRegisterUsersForm.forEach((v) =>
            v.value ? mspUsers.push(v.value) : ''
        );

        const moUsers = this.mspRegDataSvc.mapUserDef(mspUsers);
        console.log('MO - Users:', moUsers);
    }
}
