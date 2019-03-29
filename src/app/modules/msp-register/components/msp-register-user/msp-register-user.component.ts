import { Component, Input } from '@angular/core';
import { UserTitle } from '@msp-register/interfaces';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
    validFormControl,
    validMultiFormControl,
} from '@msp-register/models/validator-helpers';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'sitereg-msp-register-user',
    templateUrl: './msp-register-user.component.html',
    styleUrls: ['./msp-register-user.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MspRegisterUserComponent {
    @Input() fg: FormGroup;
    validFormControl: () => boolean;

    userTitles: UserTitle[] = ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', 'Rev.'];
    administeringFor: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
        [
            'Employees',
            'International Students',
            'Employees and International Students',
        ]
    );

    constructor(private router: Router) {
        this.validFormControl = validMultiFormControl.bind(this);
    }
}
