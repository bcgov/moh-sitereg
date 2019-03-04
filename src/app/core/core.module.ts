import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SharedCoreModule } from 'moh-common-lib';
@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    SharedCoreModule,

  ],
  exports: [
  HomePageComponent,

]
})
export class CoreModule { }
