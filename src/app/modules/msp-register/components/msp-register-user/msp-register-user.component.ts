import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Output,
    EventEmitter,
    OnDestroy,
    Input,
} from '@angular/core';
import { IUser, UserTitle } from '@msp-register/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MspRegisterPerson } from '@msp-register/models/msp-register-person';
import { GenerateForm } from '@msp-register/models/generate-form';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import {
    validFormControl,
    validMultiFormControl,
} from '@msp-register/models/validator-helpers';

@Component({
    selector: 'sitereg-msp-register-user',
    templateUrl: './msp-register-user.component.html',
    styleUrls: ['./msp-register-user.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MspRegisterUserComponent {
    @Input() fg: FormGroup;

    userTitles: UserTitle[] = ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', 'Rev.'];
    validFormControl: () => boolean;
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
