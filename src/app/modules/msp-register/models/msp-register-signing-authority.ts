import { GenerateForm } from './generate-form';
import {
  IMspOrganization,
  IMspSigningAuthority
} from '@msp-register/interfaces';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import {
  required,
  maxLength,
  minLength,
  phoneValidator
} from './validator-helpers';
/*
"sa_curtesy_title": {
          "type": "string",
          "maxLength": 5
        },
        "sa_last_name": {
          "type": "string",
          "maxLength": 100
        },
        "sa_first_name": {
          "type": "string",
          "maxLength": 100
        },
        "sa_initial": {
          "type": "string",
          "maxLength": 1
        },
        "sa_job_title": {
          "type": "string",
          "maxLength": 100
        },
        "sa_email": {
          "type": "string",
          "maxLength": 100
        },
        "sa_phone_num": {
          "type": "string",
          "pattern": "^[1-9]{3}-[0-9]{3}-[0-9]{4}$"
        },
        "sa_phone_ext": {
          "type": "string",
          "maxLength": 100
        },
        "sa_fax_num": {
          "type": "string",
          "pattern": "^[1-9]{3}-[0-9]{3}-[0-9]{4}$"
        },
        "sa_msp_access": {
          "type": "string",
          "pattern": "^[YN]"
        },
        "sa_spg": {
          "type": "string",
          "pattern": "^[EIB]$"
        },
        "sa_ldap_id": {
          "type": "string",
          "pattern": ""
        }
        */
export class MspRegisterSigningAuthority
  extends GenerateForm<IMspSigningAuthority>
  implements IMspSigningAuthority {
  directAccess: boolean | FormControl = false;
  alsoAdmin: boolean | FormControl = false;
  userTitle?: FormControl | 'mr' | 'mrs' = null;
  firstName: string | FormControl = '';
  initial?: string | FormControl = '';
  lastName: string | FormControl = '';
  jobTitle: string | FormControl = '';
  emailAddress: string | FormControl = '';
  phone: string | FormControl = '';
  ext?: string | FormControl = '';
  fax: string | FormControl = '';
  administeringFor: string | FormControl;
  confirmEmail: string | FormControl = '';
  get validators() {
    return {
      directAccess: [required],
      alsoAdmin: [required, minLength(), maxLength()],
      userTitle: [maxLength(5)],
      firstName: [required, minLength(), maxLength()],
      initial: [maxLength(1)],
      lastName: [required, minLength(), maxLength()],
      jobTitle: [required, minLength(), maxLength()],
      emailAddress: [required, Validators.email, maxLength()],
      confirmEmail: [required, Validators.email, maxLength()],
      phone: [required, phoneValidator()],
      ext: [maxLength()],
      fax: [maxLength(10), phoneValidator()]
    };
  }

  constructor(
    private gf: GenerateForm<IMspOrganization>,
    private newFb: FormBuilder
  ) {
    super(newFb);
  }
}
