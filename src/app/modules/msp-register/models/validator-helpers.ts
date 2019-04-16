import {
    ValidatorFn,
    Validators,
    FormControl,
    AbstractControl,
    FormGroup,
} from '@angular/forms';

export type validatorOpts = 'req' | 'min' | 'max';
export interface IValidatorConfig {
    options: validatorOpts;
    num?: number;
}

export interface IValidator {
    name: string;
    opts: IValidatorConfig[];
}

export class ValidatorHelpers {
    organization = [
        { name: 'name', opts: [{ options: 'req', num: 10 }] },
    ] as IValidator[];

    *genValidators(
        option: validatorOpts,
        num: number = 0
    ): Iterator<ValidatorFn> {
        yield Validators.required;
        yield Validators.minLength(num);
        yield Validators.maxLength(num);
    }
}

export function postalCodeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const forbidden = !/^[ABCEGHJ-NPRSTV-Z][0-9][ABCEGHJ-NPRSTV-Z][0-9][ABCEGHJ-NPRSTV-Z][0-9]$/.test(
            control.value
        );
        return forbidden
            ? { invalidPostalCode: { value: control.value } }
            : null;
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

/**
 * Validates number, alphabetics, small braces, slash ,hyphen, colon, full stop
 */
export function addressValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const forbidden = !/^$|[0-9A-Za-z\s\-\/():.,]+$/.test(control.value);
        return forbidden ? { invalidAddress: { value: control.value } } : null;
    };
}

export function administeringForValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const forbidden = !/^[EIB]$/.test(control.value);
        return forbidden
            ? { invalid: { value: `${control.value} is not valid` } }
            : null;
    };
}

export function phoneValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const forbidden = !/^[1-9][0-9]{2}[0-9]{7}$|^$/.test(control.value);
        return forbidden
            ? { invalid: { value: `${control.value} is not valid` } }
            : null;
    };
}

export function faxValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!control.value) return null;
        const forbidden = !/^[1-9][0-9]{2}[0-9]{7}$|^$/.test(control.value);
        return forbidden
            ? { invalid: { value: `${control.value} is not valid` } }
            : null;
    };
}

export function validFormControl(name: string) {
    if (this.fg.controls[name].pristine) return false;
    return this.fg.controls[name].invalid;
}

export function validMultiFormControl(fg: FormGroup, name: string) {
    if (fg.controls[name].pristine) return false;
    return fg.controls[name].invalid;
}

export const required = Validators.required;
export const maxLength = (num: number = 100) => Validators.maxLength(num);
export const minLength = (num: number = 3) => Validators.minLength(num);
