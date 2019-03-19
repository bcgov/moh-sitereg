import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspRegisterUsersComponent } from './msp-register-users.component';
import { SharedModule } from '@shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MspRegisterPersonComponent } from '../msp-register-person/msp-register-person.component';

describe('MspRegisterUsersComponent', () => {
  let component: MspRegisterUsersComponent;
  let fixture: ComponentFixture<MspRegisterUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule],
      declarations: [ MspRegisterUsersComponent, MspRegisterPersonComponent ],
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
