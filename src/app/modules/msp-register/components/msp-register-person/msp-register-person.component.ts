import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { IUser, UserTitle } from '@msp-register/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MspRegisterPerson } from '@msp-register/models/msp-register-person';
import { GenerateForm } from '@msp-register/models/generate-form';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sitereg-msp-register-person',
  templateUrl: './msp-register-person.component.html',
  styleUrls: ['./msp-register-person.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MspRegisterPersonComponent implements OnInit, OnDestroy {

  @Output() person: EventEmitter<IUser> = new EventEmitter<IUser>();
  @Input() fg: FormGroup;
  // fg: FormGroup;
  subscription: Subscription;
  userTitles: UserTitle[] = ['mr', 'mrs'];

  constructor(
  ) {

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }



}
