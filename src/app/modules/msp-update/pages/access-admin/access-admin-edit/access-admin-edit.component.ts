import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import {
  cUpdateAccessAdminEnumeration, cUpdateAccessAdminValidator
} from '../shared/access-admin-shared';

import { 
  validMultiFormControl, formControlValidity, isValidOptionalField, matchFieldValidator
} from '../../../common/update-validators';


@Component({
  selector: 'sitereg-update-access-admin-edit',
  templateUrl: './access-admin-edit.component.html',
  styleUrls: ['./access-admin-edit.component.scss']
})
export class MspDirectUpdateAccessAdministratorEditComponent implements OnInit {

  private arrayFormPropertyName = 'arrayOfForms';
  @Input() formState: FormGroup | null;
  @Output() formArrayChanged: EventEmitter<FormGroup | FormArray | null> = new EventEmitter<FormGroup | null>();
  parentForm: FormGroup;
  validFormControl: (fg: FormGroup, name: string) => boolean;
  formControlValidity: (fg: FormGroup, name: string) => { required: boolean; other: boolean };

  @Input() showAdministeringMSPForQuestion = true;
  userTitles = cUpdateAccessAdminEnumeration.userTitles;
  administeringForOptions = cUpdateAccessAdminEnumeration.administeringFor.edit;
  changeRoleOptions = cUpdateAccessAdminEnumeration.changeRole;
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
      forIdentifyEmailAddress: [null, cUpdateAccessAdminValidator.edit.forIdentifyEmailAddress],
      forIdentifyMinistryUserId: [null, cUpdateAccessAdminValidator.edit.forIdentifyMinistryUserId],
      userTitle: [null, cUpdateAccessAdminValidator.edit.userTitle],
      firstName: [null, cUpdateAccessAdminValidator.edit.firstName],
      initial: [null, cUpdateAccessAdminValidator.edit.initial],
      lastName: [null, cUpdateAccessAdminValidator.edit.lastName],
      jobTitle: [null, cUpdateAccessAdminValidator.edit.jobTitle],
      formGroupEmail: this.fb.group({
        emailAddress: [null, cUpdateAccessAdminValidator.edit.emailAddress],
        confirmEmail: [null, cUpdateAccessAdminValidator.edit.confirmEmail],
      }, { validator: matchFieldValidator('confirmEmail', 'emailAddress')}),
      phone: [null, cUpdateAccessAdminValidator.edit.phone],
      ext: [null, cUpdateAccessAdminValidator.edit.ext],
      fax: [null, cUpdateAccessAdminValidator.edit.fax],
      administeringFor: [null, cUpdateAccessAdminValidator.edit.administeringFor],
      changeAdministerFor: [null, cUpdateAccessAdminValidator.edit.changeAdministeringFor],
      changeRole: [this.changeRoleOptions[0], cUpdateAccessAdminValidator.edit.changeRole],
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

    // generate access-administrator-remove object
    const json: any = {};
    json.email = formValues && formValues.emailAddress ? formValues.emailAddress : '';
    if (isValidOptionalField(formValues.ministryUserId)) json.user_id = formValues.ministryUserId;
    return json;
  }

}
