import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspRegisterAuthorizeComponent } from './msp-register-authorize.component';

describe('MspRegisterAuthorizeComponent', () => {
  let component: MspRegisterAuthorizeComponent;
  let fixture: ComponentFixture<MspRegisterAuthorizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspRegisterAuthorizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspRegisterAuthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
