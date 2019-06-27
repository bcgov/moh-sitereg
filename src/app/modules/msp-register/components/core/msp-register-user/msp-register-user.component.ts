import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
    validMultiFormControl,
    matchFieldValidator,
} from '@msp-register/models/validator-helpers';
import { BehaviorSubject } from 'rxjs';
import {
    cAdministeringFor,
    cUserTitles,
} from '@msp-register/models/core/core-types';

@Component({
    selector: 'sitereg-msp-register-user',
    templateUrl: './msp-register-user.component.html',
    styleUrls: ['./msp-register-user.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MspRegisterUserComponent implements AfterViewInit {
    @Input() fg: FormGroup;
    @Input() showAdministeringMSPForQuestion = true; // needed in MSP updates only
    validFormControl: (fg: FormGroup, name: string) => boolean;

    userTitles = cUserTitles;
    administeringFor: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
        cAdministeringFor
    );

    constructor(private router: Router) {
        this.validFormControl = validMultiFormControl.bind(this);
    }

    ngAfterViewInit() {
        this.fg.setValidators(
            matchFieldValidator('confirmEmail', 'emailAddress')
        );
    }
}
