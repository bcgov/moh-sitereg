import { GenerateForm } from './generate-form';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import {
    ctFormControlString,
    ctFormControlUserTitle,
    applyMixins,
    cUserValidators,
} from './core/core-types';
import { MspUser } from './imodels/msp-register-user';
import { IMspUser } from '@msp-register/interfaces/i-msp-user';

export class MspRegisterUsers extends GenerateForm<IMspUser>
    implements MspUser {
    userTitle?: ctFormControlUserTitle = null;
    firstName: ctFormControlString = null;
    initial?: ctFormControlString = null;
    lastName: ctFormControlString = null;
    jobTitle: ctFormControlString = null;
    emailAddress: ctFormControlString = null;
    confirmEmail: ctFormControlString = null;
    phone: ctFormControlString = null;
    ext?: ctFormControlString = null;
    fax: ctFormControlString = null;
    administeringFor: ctFormControlString = null;

    validators() {
        return cUserValidators;
    }

    constructor(private gf: GenerateForm<IMspUser>, public newFb: FormBuilder) {
        super(newFb);
        const valid = new FormControl('', Validators.required);
    }
}

applyMixins(MspRegisterUsers, [MspUser, GenerateForm]);
