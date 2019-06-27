import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspEmailComponent } from './email.component';

describe('EmailComponent', () => {
  let component: MspEmailComponent;
  let fixture: ComponentFixture<MspEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
