import { GenerateForm } from './generate-form';
import { IUser, IMspOrganization } from '@msp-register/interfaces';
import { FormControl, FormBuilder } from '@angular/forms';

export class MspRegisterPerson extends GenerateForm<IUser> implements IUser {
  userTitle?: 'mr' | 'mrs' | FormControl = 'mr';
  initial?: string | FormControl = '';
  firstName: string | FormControl = '';
  lastName: string | FormControl = '';
  jobTitle: string | FormControl = '';
  emailAddress: string | FormControl = '';
  confirmEmail: string | FormControl = '';
  phone: string | FormControl = '';
  ext?: string | FormControl = '';
  fax: string | FormControl = '';
  administeringFor: string | FormControl;

  constructor(private gf: GenerateForm<IUser>, private newFb: FormBuilder) {
    super(newFb);
  }
}
