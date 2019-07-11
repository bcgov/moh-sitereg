import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {
  cUpdateSigningAuthorityEnumeration, cUpdateSigningAuthorityValidator
} from '../shared/signing-authority-shared';

import { 
  validMultiFormControl, formControlValidity
} from '../../../common/update-validators';

@Component({
  selector: 'sitereg-update-signing-authority-add',
  templateUrl: './signing-authority-add.component.html',
  styleUrls: ['./signing-authority-add.component.scss']
})
export class MspDirectUpdateSigningAuthorityAddComponent implements OnInit {

  @Input() showAdministeringMSPForQuestion = true; // needed in MSP updates only
  private arrayFormPropertyName = 'arrayOfForms';
  @Input() formState: FormGroup | null;
  @Output() formArrayChanged: EventEmitter<FormGroup | FormArray | null> = new EventEmitter<FormGroup | null>();
  parentForm: FormGroup;
  validFormControl: (fg: FormGroup, name: string) => boolean;
  formControlValidity: (fg: FormGroup, name: string) => { required: boolean; other: boolean };

  userTitles = cUpdateSigningAuthorityEnumeration.userTitles;
  administeringForOptions = cUpdateSigningAuthorityEnumeration.administeringFor.add;
  radioBtnLabels = [{ label: 'No', value: false }, { label: 'Yes', value: true }];

  constructor(private fb: FormBuilder) {
    this.validFormControl = validMultiFormControl;
    this.formControlValidity = formControlValidity;
  }

  ngOnInit() {
    this.createOrUpdateForms();
  }

  private createOrUpdateForms() {
    if (!this.formState) {
      console.log('create or update form');
      this.parentForm = this.fb.group({
        arrayOfForms: this.fb.array([])
      });
    } else {
      this.parentForm = this.formState;
    }
  }

  private createArrayForm() {
    return this.fb.group({
      userTitle: [null, cUpdateSigningAuthorityValidator.add.userTitle],
      firstName: [null, cUpdateSigningAuthorityValidator.add.firstName],
      initial: [null, cUpdateSigningAuthorityValidator.add.initial],
      lastName: [null, cUpdateSigningAuthorityValidator.add.lastName],
      jobTitle: [null, cUpdateSigningAuthorityValidator.add.jobTitle],
      emailAddress: [null, cUpdateSigningAuthorityValidator.add.emailAddress],
      confirmEmail: [null, cUpdateSigningAuthorityValidator.add.confirmEmail],
      phone: [null, cUpdateSigningAuthorityValidator.add.phone],
      ext: [null, cUpdateSigningAuthorityValidator.add.ext],
      fax: [null, cUpdateSigningAuthorityValidator.add.fax],
      isAdmin: [null, cUpdateSigningAuthorityValidator.add.isAdmin],
      // administeringFor: [null, cUpdateSigningAuthorityValidator.add.administeringFor],

    });
  }

  private removeForm(index: number) {
    console.log('Deleteing Form at ' + index);
    this.getFormsArray.removeAt(index);
    this.formArrayChanged.emit(this.parentForm);
  }


  get getFormsArray(): FormArray | null {
    return this.parentForm.get(this.arrayFormPropertyName) as FormArray | null;
  }

  get getFormsCount(): number {
    return this.getFormsArray ? this.getFormsArray.controls.length : 0;
  }

  public newForm() {
    console.log('Adding new Form');
    this.getFormsArray.insert(0, this.createArrayForm());
    this.formArrayChanged.emit(this.parentForm);
  }

  
  // updateAccessValidation(formGroup, status) {
  //   const control = formGroup.controls.administeringFor as FormControl;
  //   if (status === true) {
  //     control.setValidators(Validators.required);
  //   } else {
  //     control.clearValidators();
  //   }
  //   control.setValue('', { onlySelf: false });
  //   formGroup.updateValueAndValidity();
  // }

  // generateJSON(formValues) {

  //   // generate signing-authorityistrator-remove object
  //   const json: any = {};
  //   json.email = formValues && formValues.emailAddress ? formValues.emailAddress : '';
  //   if (isValidOptionalField(formValues.ministryUserId)) json.user_id = formValues.ministryUserId;
  //   return json;
  // }

}
