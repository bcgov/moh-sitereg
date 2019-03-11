import { Injectable } from '@angular/core';
import { MspRegisterOrganization } from '@msp-register/models/msp-register-organization';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenerateForm } from '@msp-register/models/generate-form';
import { BehaviorSubject } from 'rxjs';
import { MspRegisterAccessAdmins } from '@msp-register/models/msp-register-access-admins';
import { MspRegisterSigningAuthority } from '@msp-register/models/msp-register-signing-authority';
import { MspRegisterGroupNumbers } from '@msp-register/models/msp-register-group-numbers';
import { MspRegisterUsers } from '@msp-register/models/msp-register-users';
import { MspRegisterAuthorize } from '@msp-register/models/msp-register-authorize';

@Injectable({
  providedIn: 'root'
})
export class MspRegisterStateService {
  private fb = new FormBuilder();
  private gf = new GenerateForm(this.fb);
  public mspRegisterOrganizationForm: FormGroup;
  public mspRegisterAccessAdminsForm: FormGroup[];
  public mspRegisterSigningAuthorityForm: FormGroup;
  public mspRegisterGroupNumbersForm: FormGroup;
  public mspRegisterUsersForm: FormGroup[];
  public mspRegisterAuthorizeForm: FormGroup;


  get formBuilder() {
    return this.fb;
  }

  get accessAdminsValid() {
    return true;
  }

  addAdmin() {
    this.mspRegisterAccessAdminsForm.unshift(this.createMspRegisterSigningAuthorityForm(this.gf, this.fb));
  }

  removeAdmin(i: number) {
    this.mspRegisterAccessAdminsForm.splice(i, 1);
  }

  addUser() {
    this.mspRegisterUsersForm.unshift(this.createMspRegisterUsersForm(this.gf, this.fb));
  }

  removeUser(i: number) {
    this.mspRegisterUsersForm.splice(i, 1);
  }

  constructor() {
    const fb = this.fb;
    const gf = this.gf;
    this.mspRegisterOrganizationForm = this.createMspRegisterOrganizationForm(gf, fb);
    this.mspRegisterAccessAdminsForm = [this.createMspRegisterAccessAdminsForm(gf, fb)];
    this.mspRegisterSigningAuthorityForm = this.createMspRegisterSigningAuthorityForm(gf, fb);
    this.mspRegisterGroupNumbersForm = this.createMspRegisterGroupNumbersForm(gf, fb);
    this.mspRegisterUsersForm = [this.createMspRegisterUsersForm(gf, fb)];
    this.mspRegisterAuthorizeForm = this.createMspRegisterAuthorizeForm(gf, fb);
    this.mspRegisterOrganizationForm.valueChanges.subscribe(obs => console.log(obs));
  }

  createMspRegisterOrganizationForm(gf: GenerateForm<any>, fb: FormBuilder) {
    const mro = new MspRegisterOrganization(gf, fb);
    return this.fb.group(mro.genForms(mro.generateArr(mro.genKeys)));
 }

 createMspRegisterAccessAdminsForm(gf: GenerateForm<any>, fb: FormBuilder) {
   const mraa = new MspRegisterAccessAdmins(gf, fb);
   return this.fb.group(mraa.genForms(mraa.generateArr(mraa.genKeys)));
 }

 createMspRegisterSigningAuthorityForm(gf: GenerateForm<any>, fb: FormBuilder) {
   const mrsa = new MspRegisterSigningAuthority(gf, fb);
   return this.fb.group(mrsa.genForms(mrsa.generateArr(mrsa.genKeys)));
 }

 createMspRegisterGroupNumbersForm(gf: GenerateForm<any>, fb: FormBuilder) {
   const mrgn = new MspRegisterGroupNumbers(gf, fb);
   return this.fb.group(mrgn.genForms(mrgn.generateArr(mrgn.genKeys)));
 }

 createMspRegisterUsersForm(gf: GenerateForm<any>, fb: FormBuilder) {
   const mru = new MspRegisterUsers(gf, fb);
   return this.fb.group(mru.genForms(mru.generateArr(mru.genKeys)));
 }

 createMspRegisterAuthorizeForm(gf: GenerateForm<any>, fb: FormBuilder) {
   const mra = new MspRegisterAuthorize(gf, fb);
   return this.fb.group(mra.genForms(mra.generateArr(mra.genKeys)));
 }
}
