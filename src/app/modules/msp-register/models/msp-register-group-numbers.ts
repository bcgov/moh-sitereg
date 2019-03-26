import { IMspAccessAdmin } from '@msp-register/interfaces/i-msp-access-admins';
import { GenerateForm } from './generate-form';
import { FormBuilder, FormControl } from '@angular/forms';
import { IMspGroupNumbers } from '@msp-register/interfaces';
import { required, minLength, maxLength } from './validator-helpers';

export class MspRegisterGroupNumbers extends GenerateForm<IMspGroupNumbers>
    implements IMspGroupNumbers {
    groupNumber: FormControl | string = '';
    get validators() {
        return {
            groupNumber: [required, minLength(), maxLength(7)],
        };
    }
    constructor(
        private gf: GenerateForm<IMspAccessAdmin>,
        private newFb: FormBuilder
    ) {
        super(newFb);
    }
}
