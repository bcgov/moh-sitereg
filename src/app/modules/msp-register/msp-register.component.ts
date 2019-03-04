import { Component, OnInit } from '@angular/core';
import {Container} from 'moh-common-lib/models';
import { subRoutes } from './msp-register-routing.module';

@Component({
  selector: 'sitereg-msp-register',
  templateUrl: './msp-register.component.html',
  styleUrls: ['./msp-register.component.scss']
})
export class MspRegisterComponent extends Container implements OnInit {

  constructor() {
    super();
    this.setProgressSteps( subRoutes );
  }

  ngOnInit() {
  }

  continue() {
    console.log('continue clicked!');
  }

}
