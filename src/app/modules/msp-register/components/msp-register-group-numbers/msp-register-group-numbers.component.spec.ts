import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspRegisterGroupNumbersComponent } from './msp-register-group-numbers.component';

describe('MspRegisterGroupNumbersComponent', () => {
  let component: MspRegisterGroupNumbersComponent;
  let fixture: ComponentFixture<MspRegisterGroupNumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspRegisterGroupNumbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspRegisterGroupNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
