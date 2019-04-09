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
import { ctFormControlString, ctFormControlBoolean, ctFormControlUserTitle, cUserMspValidators } from './core/core-types';

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

    //#region REMOVEME - Delete me

    userTitle?: ctFormControlUserTitle = 'Mr.';
    firstName: ctFormControlString = 'Faheem';
    initial?: ctFormControlString = 'A';
    lastName: ctFormControlString = 'Wattoo';
    jobTitle: ctFormControlString = 'Angular Developer';
    emailAddress: ctFormControlString = 'faheem.wattoo@maximusbc.ca';
    confirmEmail: ctFormControlString = 'faheem.wattoo@maximusbc.ca';
    phone: ctFormControlString = '7787917432';
    ext?: ctFormControlString = '111';
    fax: ctFormControlString = '7787917432';
    administeringFor: ctFormControlString = 'Employees';
    directMspAccess: ctFormControlBoolean = true;

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
