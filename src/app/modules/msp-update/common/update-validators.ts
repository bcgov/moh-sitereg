import { AbstractControl, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

//#region Validators-Commmon


export function copyToClipBoard(content: any) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
        e.clipboardData.setData('text/plain', JSON.stringify(content));
        e.preventDefault();
        document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
}

export function getDateinMMDDYYYY(date: Date) {
    let mm: string;
    let dd: string;
    let yyyy: string;

    let dateString: string;

    dd = date.getDate().toString();
    mm = (date.getMonth() + 1).toString();
    yyyy = date.getFullYear().toString();

    dateString =
        `${mm.length > 1 ? mm : '0' + mm}` +
        `-${dd.length > 1 ? dd : '0' + dd}` +
        `-${yyyy}`;

    return dateString;
}


export function funcRandomNumber8Digit() {
    return Math.floor(Math.random() * 89999999 + 10000000).toString();
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

    // console.log(status);
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

//#endregion

//#region Validators-IAM


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

//#endregion
