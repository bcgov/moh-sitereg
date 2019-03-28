import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { Router } from '@angular/router';
import { MspRegisterDataService } from '@msp-register/services/msp-register-data.service';
import {
    validFormControl,
    validMultiFormControl,
} from '@msp-register/models/validator-helpers';

@Component({
    selector: 'sitereg-msp-register-user-msp',
    templateUrl: './msp-register-user-msp.component.html',
    styleUrls: ['./msp-register-user-msp.component.scss'],
})
export class MspRegisterUserMspComponent implements OnInit {
    @Input() fg: FormGroup;
    validFormControl: () => boolean;

    constructor(
        private router: Router
    ) {
        // public mspRegDataSvc: MspRegisterDataService
        // public mspRegisterStateSvc: MspRegisterStateService,

        // this.fg = this.mspRegisterStateSvc.mspRegisterUserMspForm;

       this.validFormControl = validFormControl.bind(this);
       // this.validFormControl = validMultiFormControl.bind(this);
        // this.fg.valueChanges.subscribe((obs) => console.log(this.fg));
    }

    ngOnInit() {}
}
