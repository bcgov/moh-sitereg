import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspRegisterOrganizationComponent } from './msp-register-organization.component';

describe('MspRegisterOrganizationComponent', () => {
  let component: MspRegisterOrganizationComponent;
  let fixture: ComponentFixture<MspRegisterOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspRegisterOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspRegisterOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
