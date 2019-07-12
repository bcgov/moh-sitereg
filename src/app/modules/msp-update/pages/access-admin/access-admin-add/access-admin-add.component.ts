import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {
  cUpdateAccessAdminEnumeration, cUpdateAccessAdminValidator
} from '../shared/access-admin-shared';

import { 
  validMultiFormControl, formControlValidity
} from '../../../common/update-validators';

import { getAddJsonOfAccessAdministrator } from '../shared/access-admin-json-map';

@Component({
  selector: 'sitereg-update-access-admin-add',
  templateUrl: './access-admin-add.component.html',
  styleUrls: ['./access-admin-add.component.scss']
})
export class MspDirectUpdateAccessAdministratorAddComponent implements OnInit {

  @Input() showAdministeringMSPForQuestion = true; // needed in MSP updates only
  private arrayFormPropertyName = 'arrayOfForms';
  @Input() formState: FormGroup | null;
  @Output() formArrayChanged: EventEmitter<FormGroup | FormArray | null> = new EventEmitter<FormGroup | null>();
  parentForm: FormGroup;
  validFormControl: (fg: FormGroup, name: string) => boolean;
  formControlValidity: (fg: FormGroup, name: string) => { required: boolean; other: boolean };

  userTitles = cUpdateAccessAdminEnumeration.userTitles;
  administeringForOptions = cUpdateAccessAdminEnumeration.administeringFor.add;
  json: (formValues: any) => any;

  constructor(private fb: FormBuilder) {
    this.validFormControl = validMultiFormControl;
    this.formControlValidity = formControlValidity;
    this.json = getAddJsonOfAccessAdministrator;
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
      userTitle: [null, cUpdateAccessAdminValidator.add.userTitle],
      firstName: [null, cUpdateAccessAdminValidator.add.firstName],
      initial: [null, cUpdateAccessAdminValidator.add.initial],
      lastName: [null, cUpdateAccessAdminValidator.add.lastName],
      jobTitle: [null, cUpdateAccessAdminValidator.add.jobTitle],
      emailAddress: [null, cUpdateAccessAdminValidator.add.emailAddress],
      confirmEmail: [null, cUpdateAccessAdminValidator.add.confirmEmail],
      phone: [null, cUpdateAccessAdminValidator.add.phone],
      ext: [null, cUpdateAccessAdminValidator.add.ext],
      fax: [null, cUpdateAccessAdminValidator.add.fax],
      administeringFor: [null, cUpdateAccessAdminValidator.add.administeringFor],

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


  // generateJSON(formValues) {

  //   // generate access-administrator-remove object
  //   const json: any = {};
  //   json.email = formValues && formValues.emailAddress ? formValues.emailAddress : '';
  //   if (isValidOptionalField(formValues.ministryUserId)) json.user_id = formValues.ministryUserId;
  //   return json;
  // }

}
