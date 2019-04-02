import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { Router } from '@angular/router';
import {
    validFormControl,
    validMultiFormControl,
} from '@msp-register/models/validator-helpers';
import { MspRegisterDataService } from '@msp-register/services/msp-register-data.service';
import { IMspAccessAdmin } from '@msp-register/interfaces/i-msp-access-admins';

@Component({
    selector: 'sitereg-msp-register-access-admins',
    templateUrl: './msp-register-access-admins.component.html',
    styleUrls: ['./msp-register-access-admins.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MspRegisterAccessAdminsComponent implements OnInit {
    fgs: FormGroup[];
    validFormControl: () => boolean;
    get validForms() {
        if (!this.fgs) return false;
        return this.mspRegisterStateSvc.validFormGroup(this.fgs);
    }
    constructor(
        public mspRegisterStateSvc: MspRegisterStateService,
        private router: Router,
        public mspRegDataSvc: MspRegisterDataService
    ) {
        this.fgs = this.mspRegisterStateSvc.mspRegisterAccessAdminsForm;
        this.validFormControl = validMultiFormControl.bind(this);
    }

    ngOnInit() {}

    continue() {
        console.clear();

        // Access Administrators
        const accessAdmins: IMspAccessAdmin[] = [];
        this.mspRegisterStateSvc.mspRegisterAccessAdminsForm.forEach((v) =>
            v.value ? accessAdmins.push(v.value) : ''
        );

        const moAccessAdministrators = this.mspRegDataSvc.mapAccessAdministratorDef(
            accessAdmins
        );
        console.log('MO - Access Admins:', moAccessAdministrators);

        this.router.navigate(['msp-registration/users']);
    }

    addAdmin() {
        this.mspRegisterStateSvc.addAdmin();
    }

    delete(i: number) {
        this.mspRegisterStateSvc.removeAdmin(i);
    }
}
