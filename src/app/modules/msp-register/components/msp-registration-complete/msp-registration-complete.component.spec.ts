import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspRegistrationCompleteComponent } from './msp-registration-complete.component';

describe('MspRegistrationCompleteComponent', () => {
  let component: MspRegistrationCompleteComponent;
  let fixture: ComponentFixture<MspRegistrationCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspRegistrationCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspRegistrationCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
