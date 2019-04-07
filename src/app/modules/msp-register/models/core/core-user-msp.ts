import { ctFormControlBoolean, cUserMspValidators } from './core-types';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IUserMsp } from '@msp-register/interfaces/base/i-user-msp';
import { CoreUser } from './core-user';

/**
 * Model provides members and validation for Users with direct msp options
 * like Signing authority, Access Administrators
 */
export class CoreUserMsp extends CoreUser implements IUserMsp {
    directMspAccess: ctFormControlBoolean = false;

    get validators(): any {
        return cUserMspValidators;
    }

    constructor(public newFb: FormBuilder) {
        super(newFb);
        const valid = new FormControl('', Validators.required);
    }
}
