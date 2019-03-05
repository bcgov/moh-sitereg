import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sitereg-msp-register-organization',
  templateUrl: './msp-register-organization.component.html',
  styleUrls: ['./msp-register-organization.component.scss']
})
export class MspRegisterOrganizationComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  continue() {
    this.router.navigate(['msp-registration/signing-authority']);
    console.log('navigates');
  }

}
