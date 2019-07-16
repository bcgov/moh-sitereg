import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestorReviewComponent } from './requestor-review.component';

describe('RequestorReviewComponent', () => {
  let component: RequestorReviewComponent;
  let fixture: ComponentFixture<RequestorReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestorReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestorReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
