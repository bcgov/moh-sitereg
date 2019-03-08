import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspRegisterRadioSelectComponent } from './msp-register-radio-select.component';

describe('MspRegisterRadioSelectComponent', () => {
  let component: MspRegisterRadioSelectComponent;
  let fixture: ComponentFixture<MspRegisterRadioSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspRegisterRadioSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspRegisterRadioSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
