import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {
  cUpdateUserEnumeration, cUpdateUserValidator
} from '../shared/user-shared';

import {
  validMultiFormControl, formControlValidity,
} from '../../../common/update-validators';

import { getAddJsonOfMspUser } from '../shared/user-shared-json-map';

@Component({
  selector: 'sitereg-update-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class MspDirectUpdateUserAddComponent implements OnInit {

  @Input() showAdministeringMSPForQuestion = true; // needed in MSP updates only
  private arrayFormPropertyName = 'arrayOfForms';
  @Input() formState: FormGroup | null;
  @Output() formArrayChanged: EventEmitter<FormGroup | FormArray | null> = new EventEmitter<FormGroup | null>();
  parentForm: FormGroup;
  validFormControl: (fg: FormGroup, name: string) => boolean;
  formControlValidity: (fg: FormGroup, name: string) => { required: boolean; other: boolean };

  userTitles = cUpdateUserEnumeration.userTitles;
  administeringForOptions = cUpdateUserEnumeration.administeringFor.add;
  json: (formValues: any) => any;


  constructor(private fb: FormBuilder) {
    this.validFormControl = validMultiFormControl;
    this.formControlValidity = formControlValidity;
    this.json = getAddJsonOfMspUser;
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
      userTitle: [null, cUpdateUserValidator.add.userTitle],
      firstName: [null, cUpdateUserValidator.add.firstName],
      initial: [null, cUpdateUserValidator.add.initial],
      lastName: [null, cUpdateUserValidator.add.lastName],
      jobTitle: [null, cUpdateUserValidator.add.jobTitle],
      emailAddress: [null, cUpdateUserValidator.add.emailAddress],
      confirmEmail: [null, cUpdateUserValidator.add.confirmEmail],
      phone: [null, cUpdateUserValidator.add.phone],
      ext: [null, cUpdateUserValidator.add.ext],
      fax: [null, cUpdateUserValidator.add.fax],
      administeringFor: [null, cUpdateUserValidator.add.administeringFor],

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
}
