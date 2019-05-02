import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspRegisterConfirmationComponent } from './msp-register-confirmation.component';

describe('MspRegisterConfirmationComponent', () => {
  let component: MspRegisterConfirmationComponent;
  let fixture: ComponentFixture<MspRegisterConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspRegisterConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspRegisterConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
