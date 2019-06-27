import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspH1WithPrintComponent } from './h2-with-print.component';

describe('HeaderWithPrintComponent', () => {
  let component: MspH1WithPrintComponent;
  let fixture: ComponentFixture<MspH1WithPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspH1WithPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspH1WithPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
