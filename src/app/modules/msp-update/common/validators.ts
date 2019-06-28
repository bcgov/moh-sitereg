import { ValidatorFn, AbstractControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { phoneValidator, faxValidator } from '@msp-register/models/validator-helpers';


export const cUserTitles = ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', 'Rev.'];

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

export function trailingSpacesValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!control.value || control.value.length === 0) return null; // Necessary for optional fields.
        const forbidden = !/^[^\s]+(\s+[^\s]+)*$/.test(
            control.value
        );
        return forbidden
            ? { invalidText: { value: control.value } }
            : null;
    };
}

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

export const cUpdateValidators = {
    ministryUserId: [
        Validators.maxLength(20),
        trailingSpacesValidator()
    ],
    emailAddress: [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
        Validators.pattern(/^(\S+)@(\S+)\.(\S+)$/),
    ],

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

export function matchFieldValidator(
    controlName: string,
    matchControlName: string
): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors | null => {
        const matchControl = formGroup.get(matchControlName);
        const control = formGroup.get(controlName);
        // console.log('Control: %o Matching Control: %o', control.value, matchControl.value);
        if (!(control.value === matchControl.value)) {
            control.setErrors({ match: true });
            // console.log(formGroup);
            return null;
        }
        control.setErrors({ match: null });
        control.updateValueAndValidity({ onlySelf: true });
        return null;
    };
}


