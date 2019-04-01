import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MspRegisterDataService } from '@msp-register/services/msp-register-data.service';
import { validMultiFormControl } from '@msp-register/models/validator-helpers';

@Component({
    selector: 'sitereg-msp-register-users',
    templateUrl: './msp-register-users.component.html',
    styleUrls: ['./msp-register-users.component.scss'],
})
export class MspRegisterUsersComponent implements OnInit {
    fgs: FormGroup[];
    validFormControl: () => boolean;
    administeringFor: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
        [
            'Employees',
            'International Students',
            'Employees and International Students',
        ]
    );
    validateFormGroup = this.mspRegisterStateSvc.validFormGroup;

    constructor(
        public mspRegisterStateSvc: MspRegisterStateService,
        private router: Router,
        public mspRegDataSvc: MspRegisterDataService
    ) {
        this.fgs = this.mspRegisterStateSvc.mspRegisterUsersForm;
        // this.fg = this.mspRegisterStateSvc.mspRegisterSigningAuthorityForm;
        this.validFormControl = validMultiFormControl.bind(this);
        this.fgs.forEach((fg) => {
            fg.valueChanges.subscribe((obs) => console.log(fg));
        });
    }

    ngOnInit() {}

    continue() {
        console.clear();
        const form = this.mspRegisterStateSvc.mspRegisterUsersForm;
        console.log('FormGroup: ', form);
        const middleWareObject = this.mspRegDataSvc.mapObjectUserDef(
            form[0].value
        );
        console.log('MO - Users:', middleWareObject);

        this.router.navigate(['msp-registration/group-numbers']);
    }

    addUser() {
        this.mspRegisterStateSvc.addUser();
    }

    delete(i: number) {
        this.mspRegisterStateSvc.removeUser(i);
    }
}
