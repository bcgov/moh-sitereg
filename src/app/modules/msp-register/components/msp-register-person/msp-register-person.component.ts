import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IUser } from '@msp-register/interfaces';
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
  fg: FormGroup;
  subscription: Subscription;

  constructor(
  ) {
    const fb = new FormBuilder();
    const gf = new GenerateForm(fb);
    const mrp = new MspRegisterPerson(gf, fb);
    this.fg = fb.group(mrp.genForms(mrp.generateArr(mrp.genKeys)));
  }

  ngOnInit() {
    this.subscription = this.fg.valueChanges.subscribe(obj => this.output(obj));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  output(obj: IUser) {
    console.log('register person', obj);
    this.person.emit(obj);
  }

}
