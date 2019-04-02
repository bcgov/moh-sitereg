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
    selector: 'sitereg-msp-register-group',
    templateUrl: './msp-register-group.component.html',
    styleUrls: ['./msp-register-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MspRegisterGroupComponent implements OnInit {
    fgs: FormGroup[];
    validFormControl: () => boolean;
    validFormGroup = this.mspRegisterStateSvc.validFormGroup;

    constructor(
        public mspRegisterStateSvc: MspRegisterStateService,
        private router: Router,
        public mspRegDataSvc: MspRegisterDataService
    ) {
        this.fgs = this.mspRegisterStateSvc.mspRegisterGroupForm;
        this.validFormControl = validMultiFormControl.bind(this);
    }

    ngOnInit() {}
    continue() {
        console.clear();
        const form = this.mspRegisterStateSvc.mspRegisterGroupForm;
        console.log('FormGroup: ', form);
        const middleWareObject = this.mspRegDataSvc.mapObjectGroupDef(
            form[0].value
        );
        console.log('MO - Group:', middleWareObject);

        this.router.navigate(['msp-registration/authorize']);
    }

    addGroupNumber() {
        this.mspRegisterStateSvc.addGroupNumber();
    }

    delete(i: number) {
        this.mspRegisterStateSvc.removeGroupNumber(i);
    }
}
