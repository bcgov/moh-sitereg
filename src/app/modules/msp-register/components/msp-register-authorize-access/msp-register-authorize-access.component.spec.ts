import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspRegisterAuthorizeAccessComponent } from './msp-register-authorize-access.component';

describe('MspRegisterAuthorizeAccessComponent', () => {
  let component: MspRegisterAuthorizeAccessComponent;
  let fixture: ComponentFixture<MspRegisterAuthorizeAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspRegisterAuthorizeAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspRegisterAuthorizeAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
