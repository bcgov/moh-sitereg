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

export class MspRegisterSigningAuthority
    extends GenerateForm<IMspSigningAuthority>
    implements IMspSigningAuthority {
    // userTitle?:
    //     | FormControl
    //     | 'Mr.'
    //     | 'Mrs.'
    //     | 'Ms.'
    //     | 'Dr.'
    //     | 'Prof.'
    //     | 'Rev.' = null;
    // firstName: string | FormControl = '';
    // initial?: string | FormControl = '';
    // lastName: string | FormControl = '';
    // jobTitle: string | FormControl = '';
    // emailAddress: string | FormControl = '';
    // confirmEmail: string | FormControl = '';
    // phone: string | FormControl = '';
    // ext?: string | FormControl = '';
    // fax: string | FormControl = '';
    // administeringFor: string | FormControl = '';
    // directMspAccess: boolean | FormControl = false;

    //#region Test Only - Delete me
    /**
     * must be removed - testing only
     */
    userTitle?:
        | FormControl
        | 'Mr.'
        | 'Mrs.'
        | 'Ms.'
        | 'Dr.'
        | 'Prof.'
        | 'Rev.' = 'Mr.';
    firstName: string | FormControl = 'Faheem';
    initial?: string | FormControl = 'A';
    lastName: string | FormControl = 'Wattoo';
    jobTitle: string | FormControl = 'Angular Developer';
    emailAddress: string | FormControl = 'faheem.wattoo@maximusbc.ca';
    confirmEmail: string | FormControl = 'faheem.wattoo@maximusbc.ca';
    phone: string | FormControl = '7787917432';
    ext?: string | FormControl = '111';
    fax: string | FormControl = '7787917432';
    administeringFor: string | FormControl = 'Employees';
    directMspAccess: boolean | FormControl = true;

    //#endregion

    get validators() {
        return {
            userTitle: [maxLength(5)],
            firstName: [required, minLength(), maxLength(100)],
            initial: [maxLength(1)],
            lastName: [required, minLength(), maxLength(100)],
            jobTitle: [required, minLength(), maxLength(100)],
            emailAddress: [required, Validators.email, maxLength(100)],
            confirmEmail: [required, Validators.email, maxLength(100)],
            phone: [required, phoneValidator()],
            ext: [maxLength(100)],
            fax: [faxValidator()],
            administeringFor: [required],
            directMspAccess: [required],
        };
    }

    constructor(
        private gf: GenerateForm<IMspOrganization>,
        private newFb: FormBuilder
    ) {
        super(newFb);
    }
}
