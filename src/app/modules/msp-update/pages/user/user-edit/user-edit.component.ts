import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import {
  cUpdateUserEnumeration, cUpdateUserValidator
} from '../shared/user-shared';

import { 
  validMultiFormControl, formControlValidity, isValidOptionalField, matchFieldValidator
} from '../../../common/update-validators';


@Component({
  selector: 'sitereg-update-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class MspDirectUpdateUserEditComponent implements OnInit {

  private arrayFormPropertyName = 'arrayOfForms';
  @Input() formState: FormGroup | null;
  @Output() formArrayChanged: EventEmitter<FormGroup | FormArray | null> = new EventEmitter<FormGroup | null>();
  parentForm: FormGroup;
  validFormControl: (fg: FormGroup, name: string) => boolean;
  formControlValidity: (fg: FormGroup, name: string) => { required: boolean; other: boolean };

  @Input() showAdministeringMSPForQuestion = true;
  userTitles = cUpdateUserEnumeration.userTitles;
  administeringForOptions = cUpdateUserEnumeration.administeringFor.edit;
  changeRoleOptions = cUpdateUserEnumeration.changeRole;
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
      forIdentifyEmailAddress: [null, cUpdateUserValidator.edit.forIdentifyEmailAddress],
      forIdentifyMinistryUserId: [null, cUpdateUserValidator.edit.forIdentifyMinistryUserId],
      userTitle: [null, cUpdateUserValidator.edit.userTitle],
      firstName: [null, cUpdateUserValidator.edit.firstName],
      initial: [null, cUpdateUserValidator.edit.initial],
      lastName: [null, cUpdateUserValidator.edit.lastName],
      jobTitle: [null, cUpdateUserValidator.edit.jobTitle],
      formGroupEmail: this.fb.group({
        emailAddress: [null, cUpdateUserValidator.edit.emailAddress],
        confirmEmail: [null, cUpdateUserValidator.edit.confirmEmail],
      }, { validator: matchFieldValidator('confirmEmail', 'emailAddress')}),
      phone: [null, cUpdateUserValidator.edit.phone],
      ext: [null, cUpdateUserValidator.edit.ext],
      fax: [null, cUpdateUserValidator.edit.fax],
      administeringFor: [null, cUpdateUserValidator.edit.administeringFor],
      changeAdministerFor: [null, cUpdateUserValidator.edit.changeAdministeringFor],
      changeRole: [this.changeRoleOptions[0], cUpdateUserValidator.edit.changeRole],
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

    // generate useristrator-remove object
    const json: any = {};
    json.email = formValues && formValues.emailAddress ? formValues.emailAddress : '';
    if (isValidOptionalField(formValues.ministryUserId)) json.user_id = formValues.ministryUserId;
    return json;
  }

}
