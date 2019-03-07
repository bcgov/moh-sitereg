import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';

@Component({
  selector: 'sitereg-msp-register-group-numbers',
  templateUrl: './msp-register-group-numbers.component.html',
  styleUrls: ['./msp-register-group-numbers.component.scss']
})
export class MspRegisterGroupNumbersComponent implements OnInit {
  fg: FormGroup;
  constructor(
    public mspRegisterStateSvc: MspRegisterStateService,
  ) {
    this.fg = this.mspRegisterStateSvc.mspRegisterGroupNumbersForm;
  }

  ngOnInit() {
  }
  continue() {
    console.log('continue clicked');
  }

}
