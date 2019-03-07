import { Injectable } from '@angular/core';
import { MspRegisterOrganization } from '@msp-register/models/msp-register-organization';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenerateForm } from '@msp-register/models/generate-form';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MspRegisterStateService {
  private fb = new FormBuilder();
  private gf = new GenerateForm(this.fb);
  public mspRegisterOrganizationForm: FormGroup;

  get formBuilder() {
    return this.fb;
  }

  createMspRegisterOrganizationForm() {
     const mro = new MspRegisterOrganization(this.gf, this.fb);
     this.mspRegisterOrganizationForm = this.fb.group(mro.genForms(mro.generateArr(mro.genKeys())));
  }
  constructor() {
    this.createMspRegisterOrganizationForm();
  }

}
