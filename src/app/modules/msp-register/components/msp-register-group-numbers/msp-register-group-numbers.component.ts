import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { Router } from '@angular/router';
import {
    validFormControl,
    validMultiFormControl,
} from '@msp-register/models/validator-helpers';
import { MspRegisterDataService } from '@msp-register/services/msp-register-data.service';
// TODO: initialize componenet with an array of the formgroups and then use NGFor to dynamically render them and add them.
@Component({
    selector: 'sitereg-msp-register-group-numbers',
    templateUrl: './msp-register-group-numbers.component.html',
    styleUrls: ['./msp-register-group-numbers.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MspRegisterGroupNumbersComponent implements OnInit {
    fgs: FormGroup[];
    validFormControl: () => boolean;
    validFormGroup = this.mspRegisterStateSvc.validFormGroup;

    constructor(
        public mspRegisterStateSvc: MspRegisterStateService,
        private router: Router,
        public mspRegDataSvc: MspRegisterDataService
    ) {
        this.fgs = this.mspRegisterStateSvc.mspRegisterGroupNumbersForm;
        this.validFormControl = validMultiFormControl.bind(this);
    }

    ngOnInit() {}
    continue() {
        // console.clear();
        // const orgForm = this.mspRegisterStateSvc.mspRegisterGroupNumbersForm;
        // console.log(orgForm);
        // const middleWareObject = this.mspRegDataSvc.map(orgForm.value);
        // console.log( 'Organization Middlware Object:', middleWareObject);
        // this.router.navigate(['msp-registration/authorize']);
    }

    addGroupNumber() {
        this.mspRegisterStateSvc.addGroupNumber();
    }

    delete(i: number) {
        this.mspRegisterStateSvc.removeGroupNumber(i);
    }
}
