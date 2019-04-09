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
