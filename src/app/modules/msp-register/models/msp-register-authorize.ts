import { IMspAccessAdmin } from '@msp-register/interfaces/i-msp-access-admins';
import { GenerateForm } from './generate-form';
import { FormBuilder, FormControl } from '@angular/forms';
import { IMspAuthorize, IMspSigningAuthority } from '@msp-register/interfaces';

export class MspRegisterAuthorize extends GenerateForm<IMspAuthorize>
    implements IMspAuthorize {
    authorities: FormControl | IMspSigningAuthority[] = new FormControl();
    captcha: boolean | FormControl = false;
    tAndC: boolean | FormControl = false;

    get validators() {
        return {
            authorities: [],
            captcha: [],
            tAndC: [],
        };
    }

    constructor(
        private gf: GenerateForm<IMspAccessAdmin>,
        private newFb: FormBuilder
    ) {
        super(newFb);
    }
}
