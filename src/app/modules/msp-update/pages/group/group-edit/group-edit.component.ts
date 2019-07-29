import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { cUpdateValidators, validMultiFormControl, isValidOptionalField } from '../../../common/validators';
import { getEditJsonOfMspGroup } from '../shared/group-shared-json-map';
import { environment } from 'src/environments/environment.prod';
import { IDataForm, RandomObjects } from '../../../common/i-dataform';


@Component({
  selector: 'sitereg-update-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class MspDirectUpdateGroupEditComponent implements OnInit, IDataForm {

  private arrayFormPropertyName = 'arrayOfForms';
  @Input() formState: FormGroup | null;
  @Output() formArrayChanged: EventEmitter<FormGroup | FormArray | null> = new EventEmitter<FormGroup | null>();
  parentForm: FormGroup;
  validFormControl: (fg: FormGroup, name: string) => boolean;
  radioBtnLabels = [{ label: 'No', value: 'N' }, { label: 'Yes', value: 'Y' }];
  json: (formValues: any) => any;

  constructor(private fb: FormBuilder) {
    this.validFormControl = validMultiFormControl;
    this.json = getEditJsonOfMspGroup;
  }

  ngOnInit() {
    this.createOrUpdateForms();
  }

  private createOrUpdateForms() {
    if (!this.formState) {
      // console.log('create or update form');
      this.parentForm = this.fb.group({
        arrayOfForms: this.fb.array([])
      });
    } else {
      this.parentForm = this.formState;
    }
  }

  private createArrayForm() {
    const form = this.fb.group({
      groupNo: ['', cUpdateValidators.group.groupNo],
      thirdPartyAdmin: ['', Validators.required]
    });
    this.patchValue(form);
    return form;
  }

  private removeForm(index: number) {
    // console.log('Deleteing Form at ' + index);
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
    // console.log('Adding new Form');
    this.getFormsArray.insert(0, this.createArrayForm());
    this.formArrayChanged.emit(this.parentForm);
  }

  patchValue(formGroup) {
    if (!environment.useDummyData) return;
    formGroup.patchValue(RandomObjects.getGroup((this.getFormsCount + 1).toString()));
  }
}
