import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sitereg-msp-register-users',
  templateUrl: './msp-register-users.component.html',
  styleUrls: ['./msp-register-users.component.scss']
})
export class MspRegisterUsersComponent implements OnInit {
  fg: FormGroup;
  administeringFor: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(['me', 'you']);
  constructor(
    public mspRegisterStateSvc: MspRegisterStateService,
    private router: Router
  ) {
    this.fg = this.mspRegisterStateSvc.mspRegisterUsersForm;
  }

  ngOnInit() {
  }

  continue() {
    this.router.navigate(['msp-registration/group-numbers']);
  }

}
