import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { IUser, UserTitle } from '@msp-register/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MspRegisterPerson } from '@msp-register/models/msp-register-person';
import { GenerateForm } from '@msp-register/models/generate-form';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'sitereg-msp-register-person',
  templateUrl: './msp-register-person.component.html',
  styleUrls: ['./msp-register-person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MspRegisterPersonComponent implements OnInit, OnDestroy {

  @Input() fg: FormGroup;
  userTitles: UserTitle[] = ['mr', 'mrs'];

  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  continue() {
    this.router.navigate(['msp-register/group-numbers']);
  }

}