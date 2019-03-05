import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspRegisterSigningAuthorityComponent } from './msp-register-signing-authority.component';

describe('MspRegisterSigningAuthorityComponent', () => {
  let component: MspRegisterSigningAuthorityComponent;
  let fixture: ComponentFixture<MspRegisterSigningAuthorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspRegisterSigningAuthorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspRegisterSigningAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
