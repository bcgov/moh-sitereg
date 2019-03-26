import { IMspSigningAuthority } from './i-msp-signing-authority';
import { FormControl } from '@angular/forms';

export interface IMspAuthorize {
    authorities: IMspSigningAuthority[] | FormControl;
    captcha: boolean | FormControl;
    tAndC: boolean | FormControl;
}
