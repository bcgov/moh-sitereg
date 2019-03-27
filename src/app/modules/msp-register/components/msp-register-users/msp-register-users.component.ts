import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MspRegisterDataService } from '@msp-register/services/msp-register-data.service';

@Component({
    selector: 'sitereg-msp-register-users',
    templateUrl: './msp-register-users.component.html',
    styleUrls: ['./msp-register-users.component.scss'],
})
export class MspRegisterUsersComponent implements OnInit {
    fgs: FormGroup[];
    administeringFor: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
        ['me', 'you']
    );
    validateFormGroup = this.mspRegisterStateSvc.validFormGroup;

    constructor(
        public mspRegisterStateSvc: MspRegisterStateService,
        private router: Router,
        public mspRegDataSvc: MspRegisterDataService
    ) {
        this.fgs = this.mspRegisterStateSvc.mspRegisterUsersForm;
    }

    ngOnInit() {}

    continue() {
        // console.clear();
        // const form = this.mspRegisterStateSvc.mspRegisterUsersForm;
        // console.log(form);
        // const middleWareObject = this.mspRegDataSvc.mapUserDef(form.value);
        // console.log( 'Signing Authority Middlware Object:', middleWareObject);

        // this.router.navigate(['msp-registration/group-numbers']);
    }

    addUser() {
        this.mspRegisterStateSvc.addUser();
    }

    delete(i: number) {
        this.mspRegisterStateSvc.removeUser(i);
    }
}
