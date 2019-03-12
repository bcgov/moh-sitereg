import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspRegisterAccessAdminsComponent } from './msp-register-access-admins.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MspRegisterAccessAdminsComponent', () => {
  let component: MspRegisterAccessAdminsComponent;
  let fixture: ComponentFixture<MspRegisterAccessAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
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
