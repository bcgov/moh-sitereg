import { GenerateForm } from './generate-form';
import { IMspOrganization, IMspSigningAuthority, IMspUsers, IUser } from '@msp-register/interfaces';
import { FormControl, FormBuilder, Validators, Validator } from '@angular/forms';




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
  administeringFor: string | FormControl = '';

  validators: [{
    name: 'firstName',
    validators: []

  }]

  constructor(
    private gf: GenerateForm<IMspOrganization>,
    private newFb: FormBuilder,
  ) {
    super(newFb);
    const valid = new FormControl('', Validators.required)
  }


}
