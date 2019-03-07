import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';

@Component({
  selector: 'sitereg-msp-register-users',
  templateUrl: './msp-register-users.component.html',
  styleUrls: ['./msp-register-users.component.scss']
})
export class MspRegisterUsersComponent implements OnInit {
  fg: FormGroup;
  constructor(
    private mspRegisterStateSvc: MspRegisterStateService,
  ) {
    this.fg = this.mspRegisterStateSvc.mspRegisterUsersForm;
  }

  ngOnInit() {
  }

}
