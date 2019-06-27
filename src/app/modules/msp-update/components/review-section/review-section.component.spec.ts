import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSectionComponent } from './review-section.component';

describe('ReviewSectionComponent', () => {
  let component: ReviewSectionComponent;
  let fixture: ComponentFixture<ReviewSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
