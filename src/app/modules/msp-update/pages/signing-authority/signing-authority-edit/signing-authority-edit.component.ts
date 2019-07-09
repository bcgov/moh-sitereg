import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import {
  cUpdateSigningAuthorityEnumeration, cUpdateSigningAuthorityValidator
} from '../shared/signing-authority-shared';

import { 
  validMultiFormControl, formControlValidity, isValidOptionalField, matchFieldValidator
} from '../../../common/update-validators';


@Component({
  selector: 'sitereg-update-signing-authority-edit',
  templateUrl: './signing-authority-edit.component.html',
  styleUrls: ['./signing-authority-edit.component.scss']
})
export class MspDirectUpdateSigningAuthorityEditComponent implements OnInit {

  private arrayFormPropertyName = 'arrayOfForms';
  @Input() formState: FormGroup | null;
  @Output() formArrayChanged: EventEmitter<FormGroup | FormArray | null> = new EventEmitter<FormGroup | null>();
  parentForm: FormGroup;
  validFormControl: (fg: FormGroup, name: string) => boolean;
  formControlValidity: (fg: FormGroup, name: string) => { required: boolean; other: boolean };

  @Input() showAdministeringMSPForQuestion = true;
  userTitles = cUpdateSigningAuthorityEnumeration.userTitles;
  administeringForOptions = cUpdateSigningAuthorityEnumeration.administeringFor.edit;
  changeRoleOptions = cUpdateSigningAuthorityEnumeration.changeRole;
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
    const formGroup = this.fb.group({
      forIdentifyEmailAddress: [null, cUpdateSigningAuthorityValidator.edit.forIdentifyEmailAddress],
      forIdentifyMinistryUserId: [null, cUpdateSigningAuthorityValidator.edit.forIdentifyMinistryUserId],
      userTitle: [null, cUpdateSigningAuthorityValidator.edit.userTitle],
      firstName: [null, cUpdateSigningAuthorityValidator.edit.firstName],
      initial: [null, cUpdateSigningAuthorityValidator.edit.initial],
      lastName: [null, cUpdateSigningAuthorityValidator.edit.lastName],
      jobTitle: [null, cUpdateSigningAuthorityValidator.edit.jobTitle],
      formGroupEmail: this.fb.group({
        emailAddress: [null, cUpdateSigningAuthorityValidator.edit.emailAddress],
        confirmEmail: [null, cUpdateSigningAuthorityValidator.edit.confirmEmail],
      }, { validator: matchFieldValidator('confirmEmail', 'emailAddress')}),
      phone: [null, cUpdateSigningAuthorityValidator.edit.phone],
      ext: [null, cUpdateSigningAuthorityValidator.edit.ext],
      fax: [null, cUpdateSigningAuthorityValidator.edit.fax],
      administeringFor: [null, cUpdateSigningAuthorityValidator.edit.administeringFor],
      changeAdministerFor: [null, cUpdateSigningAuthorityValidator.edit.changeAdministeringFor],
      changeRole: [this.changeRoleOptions[0], cUpdateSigningAuthorityValidator.edit.changeRole],
    });
    return formGroup;
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
    const formGroup = this.createArrayForm();

    this.getFormsArray.insert(0, formGroup);
    this.formArrayChanged.emit(this.parentForm);
  }

  updateAccessValidation(formGroup, status) {
    const control = formGroup.controls.administeringFor as FormControl;
    if (status === true) {
      control.setValidators(Validators.required);
    } else {
      control.clearValidators();
    }
    control.setValue('', { onlySelf: false });
    formGroup.updateValueAndValidity();
  }

  generateJSON(formValues) {

    // generate signing-authorityistrator-remove object
    const json: any = {};
    json.email = formValues && formValues.emailAddress ? formValues.emailAddress : '';
    if (isValidOptionalField(formValues.ministryUserId)) json.user_id = formValues.ministryUserId;
    return json;
  }

}
