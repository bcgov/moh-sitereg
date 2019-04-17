import { GenerateForm } from './generate-form';
import { IMspOrganization } from '@msp-register/interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import {
    postalCodeValidator,
    addressValidator,
    maxLength,
    required,
} from './validator-helpers';
import { minLength } from './validator-helpers';
import { ctFormControlString, ctFormControlBoolean } from './core/core-types';
export class MspRegisterOrganization extends GenerateForm<IMspOrganization>
    implements IMspOrganization {
    name: ctFormControlString = null;
    city: ctFormControlString = null;
    province: ctFormControlString = null;
    postalCode: ctFormControlString = null;
    thirdParty: ctFormControlBoolean = false;
    blueCross: ctFormControlBoolean = false;
    administeringFor: ctFormControlString = null;
    suite: ctFormControlString = null;
    street: ctFormControlString = null;
    streetName: ctFormControlString = null;
    addressLine2: ctFormControlString = null;

    //#endregion

    get validators() {
        return {
            // todo: non-required fields invalids forms even left blank, which in return stop forms to continue to next screen
            // possible remedy: these validators are added as required , must be removed before validating.

            // organizationNumber: [groupNumberValidator()], // TBD: opt-out, this is MSP group number
            name: [required, Validators.maxLength(100)],
            suite: [Validators.maxLength(10), addressValidator()],
            street: [required, Validators.maxLength(10), addressValidator()],
            streetName: [
                required,
                Validators.maxLength(75),
                addressValidator(),
            ],
            addressLine2: [Validators.maxLength(200), addressValidator()], // todo: test blank behaviour and validate form
            city: [required, Validators.minLength(1), maxLength(25)],
            province: [required, Validators.minLength(2), maxLength(3)],
            postalCode: [
                required,
                Validators.maxLength(6),
                postalCodeValidator(),
            ],
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
