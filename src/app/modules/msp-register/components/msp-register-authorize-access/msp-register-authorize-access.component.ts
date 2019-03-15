import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  validFormControl,
  validMultiFormControl
} from '@msp-register/models/validator-helpers';

@Component({
  selector: 'sitereg-msp-register-authorize-access',
  templateUrl: './msp-register-authorize-access.component.html',
  styleUrls: ['./msp-register-authorize-access.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MspRegisterAuthorizeAccessComponent implements OnInit {
  @Input() label: string;
  @Input() checked: boolean = false;
  @Output() value: EventEmitter<boolean> = new EventEmitter<boolean>();
  fc: FormControl;
  validFormControl: () => boolean;

  constructor() {
    this.fc = new FormControl(this.checked);
    this.validFormControl = validMultiFormControl.bind(this);
  }

  ngOnInit() {
    this.fc.valueChanges.subscribe(obs => {
      this.value.emit(obs);
    });
  }
}
