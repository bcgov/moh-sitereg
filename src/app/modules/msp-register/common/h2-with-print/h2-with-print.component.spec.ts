import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspRegisterH2WithPrintComponent } from './h2-with-print.component';

describe('HeaderWithPrintComponent', () => {
  let component: MspRegisterH2WithPrintComponent;
  let fixture: ComponentFixture<MspRegisterH2WithPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspRegisterH2WithPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspRegisterH2WithPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
