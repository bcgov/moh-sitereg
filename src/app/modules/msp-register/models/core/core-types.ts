import { FormControl, Validators } from '@angular/forms';
import { phoneValidator, faxValidator, emailValidator, trailingSpacesValidator, postalCodeValidator } from '../validator-helpers';

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
    userTitle: [Validators.maxLength(5)],
    firstName: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
        trailingSpacesValidator(),
    ],
    initial: [Validators.maxLength(1)],
    lastName: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
        trailingSpacesValidator(),
    ],
    jobTitle: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
        trailingSpacesValidator(),
    ],
    emailAddress: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.pattern(/^(\S+)@(\S+)\.(\S+)$/),
    ],
    confirmEmail: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.pattern(/^(\S+)@(\S+)\.(\S+)$/)
    ],
    phone: [Validators.required, phoneValidator()],
    ext: [Validators.maxLength(100)],
    fax: [faxValidator()],
    administeringFor: [Validators.required, Validators.maxLength(100)],
};

/**
 * Validators for user with directAccess to Msp option
 * related users implementing this validation are Signing Authority, Access Adminstrators
 */
export const cUserMspValidators = {
    userTitle: [Validators.maxLength(5)],
    firstName: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
        trailingSpacesValidator(),
    ],
    initial: [Validators.maxLength(1)],
    lastName: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
        trailingSpacesValidator(),
    ],
    jobTitle: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
        trailingSpacesValidator(),
    ],
    emailAddress: [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
        Validators.pattern(/^(\S+)@(\S+)\.(\S+)$/),
    ],
    confirmEmail: [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
        Validators.pattern(/^(\S+)@(\S+)\.(\S+)$/)
    ],
    phone: [Validators.required, phoneValidator()],
    ext: [Validators.maxLength(100)],
    fax: [faxValidator()],
    administeringFor: [Validators.required, Validators.maxLength(100)],
    directMspAccess: [Validators.required],
};

/**
 * Validators for the Update NgModule.  Similar to register, but fields are optional.
 */
export const cUpdateValidators = {
    /**
     * Org number can be 8 digits and is 0/left-padded if smaller
     */
    organizationNumber: [
        // Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.min(1),
        Validators.pattern(/^[0-9]*$/)
    ],
    //   TODO: Review with Faheem, this the same as in reg? compare to msp-register-organization.ts
    organizationName: [
        // Validators.required
    ],

    // TODO - Review with Faheem
    street: [
        // Validators.required,
        Validators.maxLength(10),
        trailingSpacesValidator()
    ],
    addressLine2: [
        Validators.maxLength(200)
    ],
    city: [
        Validators.maxLength(25),
        trailingSpacesValidator()
    ],
    province: [
        Validators.maxLength(3),
    ],
    postalCode: [
        Validators.maxLength(6),
        // postalCodeValidator(), // doesn't work if optional?
    ]
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
