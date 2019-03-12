import { IMspAccessAdmin } from '@msp-register/interfaces/i-msp-access-admins';
import { GenerateForm } from './generate-form';
import { FormBuilder, FormControl } from '@angular/forms';
import { IMspGroupNumbers } from '@msp-register/interfaces';

export class MspRegisterGroupNumbers extends GenerateForm<IMspGroupNumbers> implements IMspGroupNumbers {
  groupNumber: FormControl | number = 0;

  constructor(
    private gf: GenerateForm<IMspAccessAdmin>,
    private newFb: FormBuilder,
  ) {
    super(newFb);

  }


}