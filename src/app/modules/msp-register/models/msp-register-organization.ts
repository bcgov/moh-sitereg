import { GenerateForm } from './generate-form';
import { IMspOrganization } from '@msp-register/interfaces';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import {
    postalCodeValidator,
    addressValidator,
    maxLength,
    required,
} from './validator-helpers';
import { minLength } from './validator-helpers';
export class MspRegisterOrganization extends GenerateForm<IMspOrganization>
    implements IMspOrganization {
    name: string | FormControl = '';
    city: string | FormControl = '';
    province: string | FormControl = '';
    postalCode: string | FormControl = '';
    thirdParty: boolean | FormControl = false;
    blueCross: boolean | FormControl = false;
    administeringFor: string | FormControl = '';
    suite: string | FormControl = '';
    street: string | FormControl = '';
    streetName: string | FormControl = '';
    address: string | FormControl = '';
    // validators = new Map();
    get validators() {
        return {
            name: [required, Validators.maxLength(100)],
            suite: [required, Validators.maxLength(10), addressValidator()],
            street: [required, Validators.maxLength(10), addressValidator()],
            streetName: [
                required,
                Validators.maxLength(75),
                addressValidator(),
            ],
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
