import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspUpdateReviewComponent } from './review.component';

describe('ReviewComponent', () => {
  let component: MspUpdateReviewComponent;
  let fixture: ComponentFixture<MspUpdateReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspUpdateReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspUpdateReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
