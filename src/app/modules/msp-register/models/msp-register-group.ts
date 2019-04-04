import { IMspAccessAdmin } from '@msp-register/interfaces/i-msp-access-admins';
import { GenerateForm } from './generate-form';
import { FormBuilder, FormControl } from '@angular/forms';
import { IMspGroup } from '@msp-register/interfaces';
import {
    required,
    minLength,
    maxLength,
    groupNumberValidator,
} from './validator-helpers';

export class MspRegisterGroup extends GenerateForm<IMspGroup>
    implements IMspGroup {
    groupNumber: FormControl | string = '';
    thirdParty: boolean | FormControl = false;
    get validators() {
        return {
            groupNumber: [
                required,
                minLength(),
                maxLength(7),
                groupNumberValidator(),
            ],
            thirdParty: [required],
        };
    }
    constructor(
        private gf: GenerateForm<IMspGroup>,
        private newFb: FormBuilder
    ) {
        super(newFb);
    }
}
