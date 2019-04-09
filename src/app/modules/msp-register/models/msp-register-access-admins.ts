import { IMspAccessAdmin } from '@msp-register/interfaces/i-msp-access-admins';
import { GenerateForm } from './generate-form';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
    ctFormControlString,
    ctFormControlUserTitle,
    ctFormControlBoolean,
    cUserMspValidators,
    applyMixins,
} from './core/core-types';
import { MspAccessAdmin } from './imodels/msp-register-access-admins';

export class MspRegisterAccessAdmins extends GenerateForm<IMspAccessAdmin>
    implements MspAccessAdmin {
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
    directMspAccess: ctFormControlBoolean = false;

    get validators() {
        return cUserMspValidators;
    }

    constructor(
        private gf: GenerateForm<IMspAccessAdmin>,
        public newFb: FormBuilder
    ) {
        super(newFb);
        const valid = new FormControl('', Validators.required);
    }
}

applyMixins(MspRegisterAccessAdmins, [MspAccessAdmin, GenerateForm]);
