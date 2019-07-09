import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {
  cUpdateAccessAdminValidator
} from '../shared/access-admin-shared';

import {
  validMultiFormControl, formControlValidity, isValidOptionalField
} from '../../../common/update-validators';


@Component({
  selector: 'sitereg-update-access-admin-remove',
  templateUrl: './access-admin-remove.component.html',
  styleUrls: ['./access-admin-remove.component.scss']
})
export class MspDirectUpdateAccessAdministratorRemoveComponent implements OnInit {

  private arrayFormPropertyName = 'arrayOfForms';
  @Input() formState: FormGroup | null;
  @Output() formArrayChanged: EventEmitter<FormGroup | FormArray | null> = new EventEmitter<FormGroup | null>();
  parentForm: FormGroup;
  validFormControl: (fg: FormGroup, name: string) => boolean;
  formControlValidity: (fg: FormGroup, name: string) => { required: boolean; other: boolean };

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
      emailAddress: [null, cUpdateAccessAdminValidator.remove.emailAddress],
      ministryUserId: [null, cUpdateAccessAdminValidator.remove.ministryUserId],
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


  generateJSON(formValues) {

    // generate access-administrator-remove object
    const json: any = {};
    json.email = formValues && formValues.emailAddress ? formValues.emailAddress : '';
    if (isValidOptionalField(formValues.ministryUserId)) json.user_id = formValues.ministryUserId;
    return json;
  }

}
