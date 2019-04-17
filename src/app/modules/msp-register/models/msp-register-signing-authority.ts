import { GenerateForm } from './generate-form';
import {
    IMspOrganization,
    IMspSigningAuthority,
} from '@msp-register/interfaces';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import {
    required,
    maxLength,
    minLength,
    phoneValidator,
    faxValidator,
} from './validator-helpers';
import {
    ctFormControlString,
    ctFormControlBoolean,
    ctFormControlUserTitle,
    cUserMspValidators,
} from './core/core-types';

export class MspRegisterSigningAuthority
    extends GenerateForm<IMspSigningAuthority>
    implements IMspSigningAuthority {
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

    userTitle = null;
    firstName = 'Faheem';
    initial = 'A';
    lastName = 'Wattoo';
    jobTitle = 'Angular Developer';
    emailAddress = 'faheemfactor@gmail.com';
    confirmEmail = 'faheemfactor@gmail.com';
    phone = '1234567890';
    ext = 'A';
    fax = '1234567890';
    administeringFor = 'Employees';
    directMspAccess = false;

    //#endregion

    get validators() {
        return cUserMspValidators;
    }

    constructor(
        private gf: GenerateForm<IMspOrganization>,
        private newFb: FormBuilder
    ) {
        super(newFb);
    }
}
