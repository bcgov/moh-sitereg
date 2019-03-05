import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspRegisterAccessAdminsComponent } from './msp-register-access-admins.component';

describe('MspRegisterAccessAdminsComponent', () => {
  let component: MspRegisterAccessAdminsComponent;
  let fixture: ComponentFixture<MspRegisterAccessAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspRegisterAccessAdminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspRegisterAccessAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
