import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

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
  constructor() {
    this.fc = new FormControl(this.checked);
  }

  ngOnInit() {
    this.fc.valueChanges.subscribe(obs => {
      console.log(obs);
      this.value.emit(obs);
    })
  }


}
