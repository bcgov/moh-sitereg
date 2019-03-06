import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspRegisterComponent } from './msp-register.component';
import { SharedCoreModule } from 'moh-common-lib';
import { RouterTestingModule } from '@angular/router/testing';

describe('MspRegisterComponent', () => {
  let component: MspRegisterComponent;
  let fixture: ComponentFixture<MspRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedCoreModule, RouterTestingModule],
      declarations: [ MspRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
