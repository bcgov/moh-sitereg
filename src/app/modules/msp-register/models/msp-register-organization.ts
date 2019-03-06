import { GenerateForm } from './generate-form';
import { IMspOrganization } from '@msp-register/interfaces';
import { FormControl, FormBuilder } from '@angular/forms';


export class MspRegisterOrganization extends GenerateForm<IMspOrganization> implements IMspOrganization {
  name: string | FormControl = '';
  city: string | FormControl = '';
  province: string | FormControl = '';
  postalCode: string | FormControl = '';
  thirdParty: boolean | FormControl = false;
  blueCross: boolean | FormControl = false;
  administeringFor: string | FormControl = '';
  address: string | FormControl = '';

  constructor(
    private gf: GenerateForm<IMspOrganization>,
    private newFb: FormBuilder,
  ) {
    super(newFb);

  }


}
