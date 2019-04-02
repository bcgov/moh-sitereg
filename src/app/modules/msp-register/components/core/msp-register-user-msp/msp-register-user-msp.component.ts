import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
    validFormControl: (name: string) => boolean;

    constructor(private router: Router) {
        this.validFormControl = validFormControl.bind(this);
        // this.validFormControl = validMultiFormControl.bind(this);
    }

    ngOnInit() {}
}
