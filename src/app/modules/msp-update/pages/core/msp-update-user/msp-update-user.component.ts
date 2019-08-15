import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { cAdministeringFor } from '@msp-register/models/core/core-types';
import {
    validMultiFormControl,
    cUpdateValidators,
    matchFieldValidator,
    cUserTitles,
} from '../../../common/validators';

@Component({
    selector: 'sitereg-msp-update-user',
    templateUrl: './msp-update-user.component.html',
    styleUrls: ['./msp-update-user.component.scss'],
})
export class MspUpdateUserComponent implements OnInit, AfterViewInit {
    @Input() fg: FormGroup;
    validFormControl: (fg: FormGroup, name: string) => boolean;
    userTitles = cUserTitles;
    administeringFor: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
        cAdministeringFor
    );

    constructor(private fb: FormBuilder) {
        this.validFormControl = validMultiFormControl.bind(this);
    }

    ngAfterViewInit() {
        this.fg.setValidators(
            matchFieldValidator('confirmEmail', 'emailAddress')
        );
    }

    ngOnInit() {}

    createFormGroup() {
        this.fg = this.fb.group({
            userTitle: [null, cUpdateValidators.user.userTitle],
            firstName: [null, cUpdateValidators.user.firstName],
            initial: [null, cUpdateValidators.user.initial],
            lastName: [null, cUpdateValidators.user.lastName],
            jobTitle: [null, cUpdateValidators.user.jobTitle],
            emailAddress: [null, cUpdateValidators.user.emailAddress],
            confirmEmail: [null, cUpdateValidators.user.confirmEmail],
            phone: [null, cUpdateValidators.user.phone],
            ext: [null, cUpdateValidators.user.ext],
            administeringFor: [null, cUpdateValidators.user.administeringFor],
        });
    }
}
