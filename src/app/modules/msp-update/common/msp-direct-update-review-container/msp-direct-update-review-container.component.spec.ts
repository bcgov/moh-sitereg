import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspDirectUpdateReviewContainerComponent } from './msp-direct-update-review-container.component';

describe('MspDirectUpdateReviewContainerComponent', () => {
  let component: MspDirectUpdateReviewContainerComponent;
  let fixture: ComponentFixture<MspDirectUpdateReviewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspDirectUpdateReviewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspDirectUpdateReviewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
