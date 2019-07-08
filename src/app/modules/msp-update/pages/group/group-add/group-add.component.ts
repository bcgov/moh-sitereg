import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { validMultiFormControl, isValidOptionalField } from '@msp-register/models/validator-helpers';
import { cUpdateValidators } from '@msp-register/models/core/core-types';
import { groupNumberValidator } from '../../../common/validators';

@Component({
  selector: 'sitereg-update-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.scss']
})
export class MspDirectUpdateGroupAddComponent implements OnInit {

  private arrayFormPropertyName = 'arrayOfForms';
  @Input() formState: FormGroup | null;
  @Output() formArrayChanged: EventEmitter<FormGroup | FormArray | null> = new EventEmitter<FormGroup | null>();
  parentForm: FormGroup;
  validFormControl: (fg: FormGroup, name: string) => boolean;
  radioBtnLabels = [{label: 'No', value: '0'}, {label: 'Yes', value: '1'}];

  constructor(private fb: FormBuilder) {
    this.validFormControl = validMultiFormControl;
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
      groupNo: ['', [
        Validators.required,
        Validators.minLength(7),
        groupNumberValidator,
      ]],
      thirdPartyAdmin: ['', Validators.required]
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
    return 'please implement';
    const json: any = {};
    json.email = formValues && formValues.emailAddress ? formValues.emailAddress : '';
    if (isValidOptionalField(formValues.ministryUserId)) json.user_id = formValues.ministryUserId;
    return json;
  }

}
