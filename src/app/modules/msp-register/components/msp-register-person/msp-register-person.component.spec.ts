import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspRegisterPersonComponent } from './msp-register-person.component';

describe('MspRegisterPersonComponent', () => {
  let component: MspRegisterPersonComponent;
  let fixture: ComponentFixture<MspRegisterPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspRegisterPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspRegisterPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
