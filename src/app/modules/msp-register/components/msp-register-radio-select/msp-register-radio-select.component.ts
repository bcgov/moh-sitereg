import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'sitereg-msp-register-radio-select',
  templateUrl: './msp-register-radio-select.component.html',
  styleUrls: ['./msp-register-radio-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MspRegisterRadioSelectComponent implements OnInit {
  @Input() fg: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
