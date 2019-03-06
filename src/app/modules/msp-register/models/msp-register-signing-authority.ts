import { GenerateForm } from './generate-form';
import { IMspOrganization, IMspSigningAuthority } from '@msp-register/interfaces';
import { FormControl, FormBuilder } from '@angular/forms';


export class MspRegisterSigningAuthority extends GenerateForm<IMspSigningAuthority> implements IMspSigningAuthority {
  directAccess: boolean | FormControl = false;
  alsoAdmin: string | FormControl = '';
  userTitle?: FormControl | 'mr' | 'mrs' = null;
  firstName: string | FormControl = '';
  initial?: string | FormControl = '';
  lastName: string | FormControl = '';
  jobTitle: string | FormControl = '';
  emailAddress: string | FormControl = '';
  phone: string | FormControl = '';
  ext?: string | FormControl = '';
  fax: string | FormControl = '';

  constructor(
    private gf: GenerateForm<IMspOrganization>,
    private newFb: FormBuilder,
  ) {
    super(newFb);

  }


}
