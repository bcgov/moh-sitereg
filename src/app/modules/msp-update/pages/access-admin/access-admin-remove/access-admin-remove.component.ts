import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validMultiFormControl, cUpdateValidators } from '../../../common/validators';
import { isValidOptionalField } from '@msp-register/models/validator-helpers';


@Component({
  selector: 'sitereg-update-access-admin-remove',
  templateUrl: './access-admin-remove.component.html',
  styleUrls: ['./access-admin-remove.component.scss']
})
export class MspDirectUpdateAccessAdministratorRemoveComponent implements OnInit {

  @Input() serialNumber: number;
  fg: FormGroup;
  validFormControl: (fg: FormGroup, name: string) => boolean;

  constructor(private fb: FormBuilder) {
    this.validFormControl = validMultiFormControl;
  }

  ngOnInit() {
    this.createFormGroup();
  }

  createFormGroup() {
    this.fg = this.fb.group({
      emailAddress: [null, cUpdateValidators.emailAddress],
      ministryUserId: [null, cUpdateValidators.ministryUserId],
    });
  }

  generateJSON(formValues) {

    // generate access-administrator-remove object
    const json: any = {};
    json.email = formValues && formValues.emailAddress ? formValues.emailAddress : '';
    if (isValidOptionalField(formValues.ministryUserId)) json.user_id = formValues.ministryUserId;
    return json;
  }

}
