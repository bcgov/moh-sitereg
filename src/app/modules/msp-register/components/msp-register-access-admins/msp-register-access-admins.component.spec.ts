import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspRegisterAccessAdminsComponent } from './msp-register-access-admins.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { MspRegisterUsersComponent } from '../msp-register-users/msp-register-users.component';
import { MspRegisterPersonComponent } from '../msp-register-person/msp-register-person.component';

describe('MspRegisterAccessAdminsComponent', () => {
  let component: MspRegisterAccessAdminsComponent;
  let fixture: ComponentFixture<MspRegisterAccessAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule],
      providers: [MspRegisterStateService],
      declarations: [ MspRegisterAccessAdminsComponent, MspRegisterPersonComponent ]
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
