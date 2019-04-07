import { GenerateForm } from './generate-form';
import { IMspOrganization } from '@msp-register/interfaces';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import {
    postalCodeValidator,
    addressValidator,
    maxLength,
    required,
    groupNumberValidator,
} from './validator-helpers';
import { minLength } from './validator-helpers';
export class MspRegisterOrganization extends GenerateForm<IMspOrganization>
    implements IMspOrganization {
    // // organizationNumber: string | FormControl = ''; // TBD: opt-out, this is MSP group number
    // name: string | FormControl = '';
    // city: string | FormControl = '';
    // province: string | FormControl = '';
    // postalCode: string | FormControl = '';
    // thirdParty: boolean | FormControl = false;
    // blueCross: boolean | FormControl = false;
    // administeringFor: string | FormControl = '';
    // suite: string | FormControl = '';
    // street: string | FormControl = '';
    // streetName: string | FormControl = '';
    // addressLine2: string | FormControl = '';

    //#region REMOVEME - DEFAULTS

    name: string | FormControl = 'Maximus Canada';
    city: string | FormControl = 'Victoria';
    province: string | FormControl = 'British Columbia';
    postalCode: string | FormControl = 'V8W1L4';
    thirdParty: boolean | FormControl = false;
    blueCross: boolean | FormControl = true;
    administeringFor: string | FormControl = 'Employees';
    suite: string | FormControl = '716';
    street: string | FormControl = '01';
    streetName: string | FormControl = 'Yates Street';
    addressLine2: string | FormControl = '';

    //#endregion

    get validators() {
        return {
            // todo: non-required fields invalids forms even left blank, which in return stop forms to continue to next screen
            // possible remedy: these validators are added as required , must be removed before validating.

            // organizationNumber: [groupNumberValidator()], // TBD: opt-out, this is MSP group number
            name: [required, Validators.maxLength(100)],
            suite: [required, Validators.maxLength(10), addressValidator()],
            street: [required, Validators.maxLength(10), addressValidator()],
            streetName: [
                required,
                Validators.maxLength(75),
                addressValidator(),
            ],
            addressLine2: [Validators.maxLength(200), addressValidator()], // todo: test blank behaviour and validate form
            city: [required, minLength(), maxLength(25)],
            province: [required, minLength(2), maxLength(3)],
            postalCode: [required, maxLength(6), postalCodeValidator()],
            blueCross: [required],
            administeringFor: [required],
        };
    }

    constructor(
        private gf: GenerateForm<IMspOrganization>,
        private newFb: FormBuilder
    ) {
        super(newFb);
        // this.validators = Object.keys(this);
    }
}
