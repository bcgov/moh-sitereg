import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';

@Component({
  selector: 'sitereg-msp-register-authorize',
  templateUrl: './msp-register-authorize.component.html',
  styleUrls: ['./msp-register-authorize.component.scss']
})
export class MspRegisterAuthorizeComponent implements OnInit {
  private fg: FormGroup;
  constructor(
    private mspRegisterStateSvc: MspRegisterStateService
  ) { }

  ngOnInit() {
    this.fg = this.mspRegisterStateSvc.mspRegisterAuthorizeForm;
  }

}
