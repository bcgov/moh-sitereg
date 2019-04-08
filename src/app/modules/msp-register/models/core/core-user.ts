import {
    ctFormControlString,
    ctFormControlUserTitle,
    cUserValidators,
} from './core-types';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IUser } from '@msp-register/interfaces';

export class CoreUser implements IUser {
    userTitle?: ctFormControlUserTitle = null;
    firstName: ctFormControlString = '';
    initial?: ctFormControlString = '';
    lastName: ctFormControlString = '';
    jobTitle: ctFormControlString = '';
    emailAddress: ctFormControlString = '';
    confirmEmail: ctFormControlString = '';
    phone: ctFormControlString = '';
    ext?: ctFormControlString = '';
    fax: ctFormControlString = '';
    administeringFor: ctFormControlString = '';

    get validators(): any {
        return cUserValidators;
    }

    constructor(public newFb: FormBuilder) {
        const valid = new FormControl('', Validators.required);
    }
}
