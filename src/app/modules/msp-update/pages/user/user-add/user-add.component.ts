import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {
  validMultiFormControl, cUpdateValidators,
  cUpdateEnumeration, isValidOptionalField, validFormControl, cUpdateUserValidator, isRequiredError, formControlValidity
} from '../../../common/validators';

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

  userTitles = cUpdateEnumeration.userTitles;
  administeringForOptions = cUpdateEnumeration.administeringFor.add;


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


  generateJSON(formValues) {

    // generate useristrator-remove object
    const json: any = {};
    json.email = formValues && formValues.emailAddress ? formValues.emailAddress : '';
    if (isValidOptionalField(formValues.ministryUserId)) json.user_id = formValues.ministryUserId;
    return json;
  }

}
