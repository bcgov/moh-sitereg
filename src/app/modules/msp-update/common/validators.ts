import { ValidatorFn, AbstractControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';

export const cUserTitles = ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', 'Rev.'];

export function phoneValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const forbidden = !/^[1-9][0-9]{2}[0-9]{7}$|null|^$/.test(control.value);
        return forbidden
            ? { invalid: { value: `${control.value} is not valid` } }
            : null;
    };
}

export function faxValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!control.value) return null;
        const forbidden = !/^[1-9][0-9]{2}[0-9]{7}$|null|^$/.test(control.value);
        return forbidden
            ? { invalid: { value: `${control.value} is not valid` } }
            : null;
    };
}

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        // tslint:disable-next-line: max-line-length
        // const forbidden = !/(?:[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9](?:[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9-]*[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9])?\.)+[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9](?:[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9-]*[\u00A0-\uD7FF\uE000-\uFFFF-a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(
        const forbidden = /^(\S+)@(\S+)\.(\S+)$/.test(
            control.value
        );
        return forbidden
            ? { invalidEmail: { value: control.value } }
            : null;
    };
}


export function postalCodeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const forbidden = !/^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z][0-9][ABCEGHJ-NPRSTV-Z][0-9]$/.test(
            control.value
        );
        return forbidden
            ? { invalidPostalCode: { value: control.value } }
            : null;
    };
}

/**
 * Does not accept spaces or blank string
 */
export function trailingSpacesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!control.value || control.value.length === 0) return null; // Necessary for optional fields.
        const forbidden = !/^(?!\s*$).+/.test(
            control.value
        )
        // const forbidden = !/^[^\s]+(\s+[^\s]+)*$/.test(
        //     control.value
        // );
        return forbidden
            ? { invalidText: { value: control.value } }
            : null;
    };
}
// }
// export function trailingSpacesValidator(): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any } | null => {
//         if (!control.value || control.value.length === 0) return null; // Necessary for optional fields.
//         const forbidden = !/^[^\s]+(\s+[^\s]+)*$/.test(
//             control.value
//         );
//         return forbidden
//             ? { invalidText: { value: control.value } }
//             : null;
//     };
// }

/**
 * Validate a form control, replacing validFormControl().
 */
export function validFormControlCommon(fg: FormGroup, name: string) {
    const control = fg.controls[name];
    if (control.touched && control.errors && control.errors.required) {
        return true;
    }
    if (control.pristine) {
        return false;
    }
    return control.invalid;
}


export function validFormControl(name: string) {
    if (this.fg.controls[name].pristine) return false;
    return this.fg.controls[name].invalid;
}

export function validMultiFormControl(fg: FormGroup, name: string) {
    if (fg.controls[name].pristine) return false;
    return fg.controls[name].invalid;
}



export function validMultiFormControlExceptRequired(fg: FormGroup, name: string) {
    if (fg.controls[name].pristine) return false;
    return isRequiredError(fg, name) && fg.controls[name].errors.count === 1 ? false : fg.controls[name].invalid;
}

export function formControlValidity(fg: FormGroup, name: string): { required: boolean; other: boolean } {
    let status = {
        required: false,
        other: false
    };
    if (fg.controls[name].pristine) return status;

    status = {
        required: isRequiredError(fg, name),
        other: validMultiFormControlExceptRequired(fg, name)
    };

    // // console.log(status);
    return status;
}

export function isRequiredError(fg: FormGroup, name: string) {
    if (fg.controls[name].pristine) return false;
    let invalid = false;
    if (fg.controls[name].invalid && fg.controls[name].errors && fg.controls[name].errors.required) {
        invalid = fg.controls[name].errors.required === true ? true : false;
    }
    return invalid;
}





export const cUpdateEnumeration = {
    userTitles: ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', 'Rev.'],
    administeringFor: {

        add: [
            'Employees',
            'International Students',
            'Employees and International Students',
        ],
        edit: [
            'Employees',
            'International Students',
            'Employees and International Students',
        ]
    },
    changeRole: {
        signingAuthority: [
            'No Change',
            'Access Administrator',
            'User',
        ],
        accessAdminstrator: [
            'No Change',
            'User',
            'Signing Authority',
        ],
        user: [
            'No Change',
            'Access Administrator',
            'Signing Authority',
        ],
    }
};


/**
 * verifies if field value is not null and not empty string or valid boolean
 * @param fieldValue FieldValue
 */
export function isValidOptionalField(fieldValue: string | boolean | any): boolean {

    if (fieldValue) {
        if (typeof fieldValue === 'string' && fieldValue.length > 0) {
            return true;
        }

        if (typeof fieldValue === 'boolean' && (fieldValue === true || fieldValue === false)) {
            return true;
        }

        if (typeof fieldValue === 'object') {
            const isArray = fieldValue instanceof Array;
            if (isArray === true && fieldValue.length > 0) return true;
            return false;
        }
    }
    return false;
}

// export const cUpdateAdministeringFor = [
//     'No Change',
//     'Employees',
//     'International Students',
//     'Employees and International Students',
// ];

export const cUpdateValidators = {

    general: {
        emailAddress: [
            Validators.required,
            Validators.email,
            Validators.maxLength(100),
            Validators.pattern(/^(\S+)@(\S+)\.(\S+)$/),
        ],
        ministryUserId: [
            Validators.maxLength(20),
            trailingSpacesValidator()
        ]
    },

    requestorInformation: {
        /**
         * Org number can be 8 digits and is 0/left-padded if smaller
         */
        organizationNumber: [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(8),
            Validators.min(1),
            Validators.pattern(/^[0-9]*$/)
        ],

        emailAddress: [
            Validators.required,
            Validators.email,
            Validators.maxLength(100),
            Validators.pattern(/^(\S+)@(\S+)\.(\S+)$/),
        ],
    },

    organization: {
        /**
         * Org number can be 8 digits and is 0/left-padded if smaller
         */
        organizationName: [
            Validators.maxLength(100),
            trailingSpacesValidator()
        ],
        suite: [
            Validators.maxLength(10),
            // trailingSpacesValidator()
        ],
        street: [
            Validators.maxLength(10),
            trailingSpacesValidator()
        ],
        streetName: [
            Validators.maxLength(75),
            trailingSpacesValidator()
        ],
        addressLine2: [
            Validators.maxLength(200),
            trailingSpacesValidator()
        ],
        city: [
            Validators.minLength(1),
            Validators.maxLength(25),
            trailingSpacesValidator()
        ],
        province: [
            Validators.minLength(2),
            Validators.maxLength(3)
        ],
        postalCode: [
            Validators.maxLength(6),
            // postalCodeValidator(),
        ],
        // blueCross: [], why blue cross is missing this time in question
        administeringFor: [
            Validators.required,
            Validators.maxLength(100)
        ]
    },

    user: {
        userTitle: [
            Validators.maxLength(5),
            trailingSpacesValidator(),
        ],
        firstName: [
            Validators.minLength(1),
            Validators.maxLength(100),
            trailingSpacesValidator(),
        ],
        initial: [
            Validators.maxLength(1),
            trailingSpacesValidator(),
        ],
        lastName: [
            Validators.minLength(1),
            Validators.maxLength(100),
            trailingSpacesValidator(),
        ],
        jobTitle: [
            Validators.minLength(1),
            Validators.maxLength(100),
            trailingSpacesValidator(),
        ],
        emailAddress: [
            Validators.minLength(5),
            Validators.maxLength(100),
            Validators.pattern(/^(\S+)@(\S+)\.(\S+)$/),
        ],
        confirmEmail: [
            Validators.minLength(5),
            Validators.maxLength(100),
            Validators.pattern(/^(\S+)@(\S+)\.(\S+)$/),
        ],
        phone: [
            phoneValidator(),
            trailingSpacesValidator(),
        ],
        ext: [
            Validators.maxLength(100),
            trailingSpacesValidator(),
        ],
        fax: [faxValidator()],
        administeringFor: [Validators.maxLength(100)],
        ministryUserId: [
            Validators.maxLength(20),
            trailingSpacesValidator()]
    },

    group: {
        groupNo: [
            Validators.required,
            Validators.minLength(7),
            Validators.maxLength(7),
            groupNumberValidator,
        ],
    },

};


export const cUpdateUserValidator = {
    add: {
        userTitle: [
            ...cUpdateValidators.user.userTitle,
        ],
        firstName: [
            Validators.required,
            ...cUpdateValidators.user.firstName,
        ],
        initial: [
            ...cUpdateValidators.user.initial,
        ],
        lastName: [
            Validators.required,
            ...cUpdateValidators.user.lastName,
        ],
        jobTitle: [
            Validators.required,
            ...cUpdateValidators.user.jobTitle,
        ],
        emailAddress: [
            Validators.required,
            ...cUpdateValidators.user.emailAddress,
        ],
        confirmEmail: [
            Validators.required,
            ...cUpdateValidators.user.confirmEmail,
        ],
        phone: [
            Validators.required,
            ...cUpdateValidators.user.phone,
        ],
        ext: [
            ...cUpdateValidators.user.ext,
        ],
        fax: [
            ...cUpdateValidators.user.fax,
        ],
        administeringFor: [
            Validators.required,
            ...cUpdateValidators.user.administeringFor,
        ],
    },
    remove: {
        emailAddress: [
            Validators.required,
            ...cUpdateValidators.user.emailAddress,
        ],
        ministryUserId: [
            ...cUpdateValidators.user.ministryUserId,
        ]
    },
    edit: {
        userTitle: [
            ...cUpdateValidators.user.userTitle,
        ],
        firstName: [
            ...cUpdateValidators.user.firstName,
        ],
        initial: [
            ...cUpdateValidators.user.initial,
        ],
        lastName: [
            ...cUpdateValidators.user.lastName,
        ],
        jobTitle: [
            ...cUpdateValidators.user.jobTitle,
        ],
        emailAddress: [
            ...cUpdateValidators.user.emailAddress,
        ],
        confirmEmail: [
            ...cUpdateValidators.user.confirmEmail,
        ],
        phone: [
            ...cUpdateValidators.user.phone,
        ],
        ext: [
            ...cUpdateValidators.user.ext,
        ],
        fax: [
            ...cUpdateValidators.user.fax,
        ],


        changeRole: [
            Validators.required,
        ],

        changeAdministeringFor: [
            Validators.required,
        ],
        administeringFor: [
            ...cUpdateValidators.user.administeringFor,
        ],

        forIdentifyEmailAddress: [
            Validators.required,
            ...cUpdateValidators.user.emailAddress,
        ],
        forIdentifyMinistryUserId: [
            ...cUpdateValidators.user.ministryUserId,
        ]
    },
};

export function matchFieldValidator(
    controlName: string,
    matchControlName: string
): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors | null => {
        const matchControl = formGroup.get(matchControlName);
        const control = formGroup.get(controlName);
        // // console.log('Control: %o Matching Control: %o', control.value, matchControl.value);
        if (!(control.value === matchControl.value)) {
            control.setErrors({ match: true });
            // // console.log(formGroup);
            return null;
        }
        control.setErrors({ match: null });
        control.updateValueAndValidity({ onlySelf: true });
        return null;
    };
}


/**
 * Validates group number
 */
export function groupNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const forbidden = !/^[0-9]{7}$/.test(control.value);
        return forbidden
            ? { invalidGroupNumber: { value: control.value } }
            : null;
    };
}



