import { Component, OnInit, Input, Output, EventEmitter, Optional, Self } from '@angular/core';
import { Base } from 'moh-common-lib';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'sitereg-msp-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class MspEmailComponent extends Base implements ControlValueAccessor {

  @Input() disabled: boolean = false;
  @Input() label: string = 'Email Address';
  @Input() maxlen: string = '100';
  @Input() labelforId: string = 'email_' + this.objectId;
  @Input() placeholder: string = 'username@example.com';

  @Input()
  set value( val: string ) {
    if ( val ) {
      this.email = val;
    }
  }
  get value() {
    return this.email;
  }

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() blurEvent: EventEmitter<any> = new EventEmitter<any>();

  public email: string = '';

  _onChange = (_: any) => {};
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
      this.email = value;
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
