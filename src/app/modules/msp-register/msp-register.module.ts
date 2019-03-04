import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MspRegisterRoutingModule } from './msp-register-routing.module';
import { MspRegisterComponent } from '@msp-register/msp-register.component';

@NgModule({
  declarations: [MspRegisterComponent],
  imports: [
    CommonModule,
    MspRegisterRoutingModule
  ],
  exports: [MspRegisterComponent]
})
export class MspRegisterModule { }
