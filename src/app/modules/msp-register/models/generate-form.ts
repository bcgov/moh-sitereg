import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IMspOrganization } from '@msp-register/interfaces';

export class GenerateForm {

  constructor(
    private fb: FormBuilder
  ) {

  }

  static newOrganization(): IMspOrganization {
    const form = {
        description: new FormControl('', [Validators.required, Validators.minLength(3)]),
        dateOfIntroduction: new FormControl('', [Validators.required]),
        commonName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        latinName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        category: new FormControl('', [Validators.required]),
        primaryImage: new FormControl('')
      }

  }
}
