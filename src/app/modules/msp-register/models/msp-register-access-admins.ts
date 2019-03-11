import { IMspAccessAdmin } from '@msp-register/interfaces/i-msp-access-admins';
import { GenerateForm } from './generate-form';
import { FormBuilder, FormControl } from '@angular/forms';

export class MspRegisterAccessAdmins extends GenerateForm<IMspAccessAdmin> implements IMspAccessAdmin {
  directAccess: boolean | FormControl = false;
  userTitle?: FormControl | 'mr' | 'mrs' = new FormControl();
  firstName: string | FormControl = '';
  initial?: string | FormControl = '';
  lastName: string | FormControl = '';
  jobTitle: string | FormControl = '';
  emailAddress: string | FormControl = '';
  phone: string | FormControl = '';
  ext?: string | FormControl = '';
  fax: string | FormControl = '';

  constructor(
    private gf: GenerateForm<IMspAccessAdmin>,
    private newFb: FormBuilder,
  ) {
    super(newFb);

  }


}
