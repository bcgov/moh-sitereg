import { GenerateForm } from './generate-form';
import { IUser } from '@msp-register/interfaces';
import { FormControl, FormBuilder } from '@angular/forms';
import { IMspUser } from '@msp-register/interfaces/i-msp-user';

export class MspRegisterUser extends GenerateForm<IMspUser>
    implements IMspUser {
    userTitle?: 'Mr.' | 'Mrs.' | 'Ms.' | 'Dr.' | 'Prof.' | 'Rev.' | FormControl;
    initial?: string | FormControl = '';
    firstName: string | FormControl = '';
    lastName: string | FormControl = '';
    jobTitle: string | FormControl = '';
    emailAddress: string | FormControl = '';
    confirmEmail: string | FormControl = '';
    phone: string | FormControl = '';
    ext?: string | FormControl = '';
    fax: string | FormControl = '';
    administeringFor: string | FormControl = '';

    constructor(private gf: GenerateForm<IUser>, private newFb: FormBuilder) {
        super(newFb);
    }
}
