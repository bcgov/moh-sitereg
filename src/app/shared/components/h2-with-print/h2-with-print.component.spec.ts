import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspH3WithPrintComponent } from './h2-with-print.component';

describe('HeaderWithPrintComponent', () => {
  let component: MspH2WithPrintComponent;
  let fixture: ComponentFixture<MspH2WithPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspH2WithPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspH2WithPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
