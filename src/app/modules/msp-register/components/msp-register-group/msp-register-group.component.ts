import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { Router } from '@angular/router';
import {
    validFormControl,
    validMultiFormControl,
} from '@msp-register/models/validator-helpers';
import { MspRegisterDataService } from '@msp-register/services/msp-register-data.service';
import { IMspGroup } from '@msp-register/interfaces';
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

        // Msp Groups
        const mspGroups: IMspGroup[] = [];
        this.mspRegisterStateSvc.mspRegisterGroupForm.forEach(v => v.value ? mspGroups.push(v.value) : '');

        const moMspGroups = this.mspRegDataSvc.mapGroupDef(
            mspGroups
        );
        console.log('MO - Group:', moMspGroups);

        this.router.navigate(['msp-registration/authorize']);
    }

    addGroupNumber() {
        this.mspRegisterStateSvc.addGroupNumber();
    }

    delete(i: number) {
        this.mspRegisterStateSvc.removeGroupNumber(i);
    }
}
