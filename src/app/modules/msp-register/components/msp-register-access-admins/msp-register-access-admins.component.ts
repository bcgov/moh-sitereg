import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sitereg-msp-register-access-admins',
  templateUrl: './msp-register-access-admins.component.html',
  styleUrls: ['./msp-register-access-admins.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MspRegisterAccessAdminsComponent implements OnInit {
  fg: FormGroup;

  constructor(
    public mspRegisterStateSvc: MspRegisterStateService,
    private router: Router
  ) {
    this.fg = this.mspRegisterStateSvc.mspRegisterAccessAdminsForm;
  }

  ngOnInit() {
  }

  continue() {
    this.router.navigate(['msp-registration/users']);
  }

}
