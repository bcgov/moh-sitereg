import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sitereg-msp-register-signing-authority',
  templateUrl: './msp-register-signing-authority.component.html',
  styleUrls: ['./msp-register-signing-authority.component.scss']
})
export class MspRegisterSigningAuthorityComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  continue() {
    this.router.navigate(['msp-register/signing-authority']);
    console.log('navigates');
  }
}
