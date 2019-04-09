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
    // userTitle?: ctFormControlUserTitle = null;
    // firstName: ctFormControlString = null;
    // initial?: ctFormControlString = null;
    // lastName: ctFormControlString = null;
    // jobTitle: ctFormControlString = null;
    // emailAddress: ctFormControlString = null;
    // confirmEmail: ctFormControlString = null;
    // phone: ctFormControlString = null;
    // ext?: ctFormControlString = null;
    // fax: ctFormControlString = null;
    // administeringFor: ctFormControlString = null;
    // directMspAccess: ctFormControlBoolean = false;

    // REMOVEME Defaults
    userTitle?: ctFormControlUserTitle = 'Mr.';
    firstName: ctFormControlString = 'Faheem';
    initial?: ctFormControlString = 'A';
    lastName: ctFormControlString = 'Wattoo';
    jobTitle: ctFormControlString = 'Angular Develoiper';
    emailAddress: ctFormControlString = 'faheemfactor@gmail.com';
    confirmEmail: ctFormControlString = 'faheemfactor@gmail.com';
    phone: ctFormControlString = '7787917432';
    ext?: ctFormControlString = '125';
    fax: ctFormControlString = '7787917432';
    administeringFor: ctFormControlString = 'International Students';
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
