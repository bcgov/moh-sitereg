import { FormControl, Validators } from '@angular/forms';
import { phoneValidator, faxValidator, emailValidator } from '../validator-helpers';

export type ctFormControlString = FormControl | string;
export type ctFormControlBoolean = FormControl | boolean;
export type ctFormControlUserTitle =
    | FormControl
    | 'Mr.'
    | 'Mrs.'
    | 'Ms.'
    | 'Dr.'
    | 'Prof.'
    | 'Rev.';

// export type ctUserTitle = 'Mr.' | 'Mrs.' | 'Ms.' | 'Dr.' | 'Prof.' | 'Rev.';

export const cAdministeringFor = [
    'Employees',
    'International Students',
    'Employees and International Students',
];

export const cUserTitles = ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', 'Rev.'];

/**
 * Validators for user with 'NO directAccess to Msp' option
 * related validations are implementing for organization users
 */
export const cUserValidators = {
    userTitle: [Validators.minLength(1), Validators.maxLength(5)],
    firstName: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
    ],
    initial: [Validators.minLength(1), Validators.maxLength(1)],
    lastName: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
    ],
    jobTitle: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
    ],
    emailAddress: [
        Validators.required,
        // Validators.email,
        Validators.minLength(5),
        Validators.maxLength(100),
        emailValidator(),
    ],
    confirmEmail: [
        Validators.required,
        // Validators.email,
        Validators.minLength(5),
        Validators.maxLength(100),
        emailValidator(),
    ],
    phone: [Validators.required, phoneValidator()],
    ext: [Validators.minLength(1), Validators.maxLength(100)],
    fax: [Validators.minLength(1), faxValidator()],
    administeringFor: [Validators.required, Validators.maxLength(100)],
};

/**
 * Validators for user with directAccess to Msp option
 * related users implementing this validation are Signing Authority, Access Adminstrators
 */
export const cUserMspValidators = {
    userTitle: [Validators.minLength(1), Validators.maxLength(5)],
    firstName: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
    ],
    initial: [Validators.minLength(1), Validators.maxLength(1)],
    lastName: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
    ],
    jobTitle: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
    ],
    emailAddress: [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
    ],
    confirmEmail: [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
    ],
    phone: [Validators.required, phoneValidator()],
    ext: [Validators.minLength(1), Validators.maxLength(100)],
    fax: [Validators.minLength(1), faxValidator()],
    administeringFor: [Validators.required, Validators.maxLength(100)],
    directMspAccess: [Validators.required],
};

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(
                derivedCtor.prototype,
                name,
                Object.getOwnPropertyDescriptor(baseCtor.prototype, name)
            );
        });
    });
}
