import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspRegisterUsersComponent } from './msp-register-users.component';

describe('MspRegisterUsersComponent', () => {
  let component: MspRegisterUsersComponent;
  let fixture: ComponentFixture<MspRegisterUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspRegisterUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspRegisterUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
