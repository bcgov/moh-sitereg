import { GenerateForm } from './generate-form';
import { IMspOrganization, IMspSigningAuthority, IMspUsers, IUser } from '@msp-register/interfaces';
import { FormControl, FormBuilder } from '@angular/forms';


export class MspRegisterUsers extends GenerateForm<IMspUsers> implements IUser {
  userTitle?: 'mr' | 'mrs' | FormControl = 'mr';
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
