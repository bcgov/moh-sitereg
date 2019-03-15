import { IMspAccessAdmin } from '@msp-register/interfaces/i-msp-access-admins';
import { GenerateForm } from './generate-form';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  required,
  minLength,
  maxLength,
  phoneValidator
} from './validator-helpers';

export class MspRegisterAccessAdmins extends GenerateForm<IMspAccessAdmin>
  implements IMspAccessAdmin {
  directAccess: boolean | FormControl = false;
  userTitle?: FormControl | 'mr' | 'mrs' = null;
  firstName: string | FormControl = null;
  initial?: string | FormControl = null;
  lastName: string | FormControl = null;
  jobTitle: string | FormControl = null;
  emailAddress: string | FormControl = null;
  confirmEmail: string | FormControl = null;
  phone: string | FormControl = null;
  ext?: string | FormControl = null;
  fax: string | FormControl = null;
  administeringFor = null;

  get validators() {
    return {
      alsoAdmin: [required, minLength(), maxLength()],
      userTitle: [maxLength(5)],
      firstName: [required, minLength(), maxLength()],
      initial: [maxLength(1)],
      lastName: [required, minLength(), maxLength()],
      jobTitle: [required, minLength(), maxLength()],
      emailAddress: [required, maxLength()],
      confirmEmail: [required, Validators.email, maxLength()],
      phone: [required, minLength, maxLength(10), phoneValidator()],
      ext: [maxLength()],
      fax: [maxLength(10), phoneValidator()],
      administeringFor: [required, maxLength()]
    };
  }

  constructor(
    private gf: GenerateForm<IMspAccessAdmin>,
    private newFb: FormBuilder
  ) {
    super(newFb);
  }
}
