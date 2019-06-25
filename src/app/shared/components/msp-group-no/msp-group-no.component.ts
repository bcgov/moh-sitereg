import { Component, OnInit, Input, Output, EventEmitter, Optional, Self } from '@angular/core';
import { Base } from 'moh-common-lib';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'sitereg-msp-group-no',
  templateUrl: './msp-group-no.component.html',
  styleUrls: ['./msp-group-no.component.scss']
})
export class MspGroupNoComponent extends Base implements ControlValueAccessor {

  @Input() disabled = false;
  @Input() label = 'Msp Group Number';
  @Input() maxlen = '20';
  @Input() labelforId: string = 'mspGrpNo_' + this.objectId;

  @Input() value = '';

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() blurEvent: EventEmitter<any> = new EventEmitter<any>();


  // tslint:disable-next-line:variable-name
  _onChange = (_: any) => {};
  // tslint:disable-next-line:variable-name
  _onTouched = (_: any) => {};

  constructor( @Optional() @Self() public controlDir: NgControl ) {
    super();
    if ( controlDir ) {
      controlDir.valueAccessor = this;
    }
  }

  onValueChange( value: any ) {
    this._onChange( value );
    this.valueChange.emit( value );
  }

  onBlurEvent( event: any ) {
    this._onTouched( event );
    this.blurEvent.emit( event.target.value );
  }

  writeValue( value: any ): void {
    if ( value ) {
      this.value = value;
    }
  }

  // Register change function
  registerOnChange( fn: any ): void {
    this._onChange = fn;
  }

  // Register touched function
  registerOnTouched( fn: any ): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}