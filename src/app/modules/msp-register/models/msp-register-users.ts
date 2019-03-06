import { GenerateForm } from './generate-form';
import { IMspOrganization, IMspSigningAuthority, IMspUsers, IUser } from '@msp-register/interfaces';
import { FormControl, FormBuilder } from '@angular/forms';


export class MspRegisterUsers extends GenerateForm<IMspUsers> implements IMspUsers {
  users: IUser[] = [];

  constructor(
    private gf: GenerateForm<IMspOrganization>,
    private newFb: FormBuilder,
  ) {
    super(newFb);

  }


}
