import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspH3WithPrintComponent } from './h3-with-print.component';

describe('HeaderWithPrintComponent', () => {
  let component: MspH3WithPrintComponent;
  let fixture: ComponentFixture<MspH3WithPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspH3WithPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspH3WithPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
