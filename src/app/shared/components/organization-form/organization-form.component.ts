import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { validFormControl } from '@msp-register/models/validator-helpers';
import { cAdministeringFor } from '@msp-register/models/core/core-types';

@Component({
  selector: 'sitereg-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})
export class OrganizationFormComponent implements OnInit {
  @Input() fg: FormGroup;
  // TODO _ TEST THE OUTPUT
  @Output() fgChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  validFormControl = validFormControl;
  cAdministeringFor = cAdministeringFor;


  constructor() { }

  ngOnInit() {
    console.log('orgform admin for types?', this.cAdministeringFor);
  }


}
