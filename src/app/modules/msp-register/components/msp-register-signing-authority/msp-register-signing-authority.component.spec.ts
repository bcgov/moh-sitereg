import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspRegisterSigningAuthorityComponent } from './msp-register-signing-authority.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';

describe('MspRegisterSigningAuthorityComponent', () => {
  let component: MspRegisterSigningAuthorityComponent;
  let fixture: ComponentFixture<MspRegisterSigningAuthorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule],
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
