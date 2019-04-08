import { GenerateForm } from './generate-form';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IMspGroup } from '@msp-register/interfaces';
import { groupNumberValidator } from './validator-helpers';

export class MspRegisterGroup extends GenerateForm<IMspGroup>
    implements IMspGroup {
    groupNumber: FormControl | string = null;
    thirdParty: boolean | FormControl = false;

    get validators() {
        return {
            groupNumber: [
                Validators.required,
                Validators.minLength(7),
                Validators.maxLength(7),
                groupNumberValidator(),
            ],
            thirdParty: [Validators.required],
        };
    }
    constructor(
        private gf: GenerateForm<IMspGroup>,
        private newFb: FormBuilder
    ) {
        super(newFb);
    }
}
