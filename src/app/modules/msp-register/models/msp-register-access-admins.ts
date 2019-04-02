import { IMspAccessAdmin } from '@msp-register/interfaces/i-msp-access-admins';
import { GenerateForm } from './generate-form';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
    required,
    minLength,
    maxLength,
    phoneValidator,
    faxValidator,
} from './validator-helpers';

export class MspRegisterAccessAdmins extends GenerateForm<IMspAccessAdmin>
    implements IMspAccessAdmin {
    userTitle?:
        | FormControl
        | 'Mr.'
        | 'Mrs.'
        | 'Ms.'
        | 'Dr.'
        | 'Prof.'
        | 'Rev.' = null;
    firstName: string | FormControl = '';
    initial?: string | FormControl = '';
    lastName: string | FormControl = '';
    jobTitle: string | FormControl = '';
    emailAddress: string | FormControl = '';
    confirmEmail: string | FormControl = '';
    phone: string | FormControl = '';
    ext?: string | FormControl = '';
    fax: string | FormControl = '';
    administeringFor: string | FormControl = '';
    directMspAccess: boolean | FormControl = false;

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
        private gf: GenerateForm<IMspAccessAdmin>,
        private newFb: FormBuilder
    ) {
        super(newFb);
    }
}
