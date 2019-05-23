import { GenerateForm } from './generate-form';
import { IMspOrganization } from '@msp-register/interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import {
    postalCodeValidator,
    maxLength,
    required,
    organizationNumberValidator,
} from './validator-helpers';
import { ctFormControlString, ctFormControlBoolean } from './core/core-types';
import { GlobalConfigService } from '@shared/services/global-config.service';
export class MspRegisterOrganization extends GenerateForm<IMspOrganization>
    implements IMspOrganization {
    name: ctFormControlString = null;
    city: ctFormControlString = null;
    province: ctFormControlString = null;
    postalCode: ctFormControlString = null;
    thirdParty: ctFormControlBoolean = null;
    blueCross: ctFormControlBoolean = null;
    administeringFor: ctFormControlString = null;
    suite: ctFormControlString = null;
    street: ctFormControlString = null;
    streetName: ctFormControlString = null;
    addressLine2: ctFormControlString = null;
    organizationNumber: ctFormControlString = null;

    get validators() {
        return {
            // todo: non-required fields invalids forms even left blank, which in return stop forms to continue to next screen
            // possible remedy: these validators are added as required , must be removed before validating.

            // organizationNumber: [groupNumberValidator()], // TBD: opt-out, this is MSP group number
            name: [required, Validators.maxLength(100)],
            suite: [Validators.maxLength(10)],
            street: [required, Validators.maxLength(10)],
            streetName: [required, Validators.maxLength(75)],
            addressLine2: [Validators.maxLength(200)], // todo: test blank behaviour and validate form
            city: [required, Validators.minLength(1), maxLength(25)],
            province: [required, Validators.minLength(2), maxLength(3)],
            postalCode: [
                required,
                Validators.maxLength(6),
                postalCodeValidator(),
            ],
            blueCross: [required],
            // organizationNumber: [
            //     Validators.minLength(8),
            //     Validators.maxLength(8),
            //     organizationNumberValidator(),
            // ],
            administeringFor: [required],
        };
    }

    constructor(
        private gf: GenerateForm<IMspOrganization>,
        private newFb: FormBuilder
    ) {
        super(newFb);
        // this.validators = Object.keys(this);

        // REMOVEME - debug only
        this.setDefaultValues();
    }

    //#region REMOVE ME - Default Values

    private setDefaultValues() {
        if (GlobalConfigService.setDefaults() === true) {
            this.name = 'MAXIMUS Canada';
            this.province = 'British Columbia';
            this.city = 'Victoria';
            this.postalCode = 'V3V6A5';
            this.suite = '101';
            this.street = '716';
            this.streetName = 'Yates Street';
            this.addressLine2 = 'Head Office';
            this.thirdParty = true;
            this.administeringFor = 'Employees';
            this.organizationNumber = '12345678';
            this.blueCross = true;
        }
    }

    //#endregion
}
