import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspDirectUpdateGroupRemoveComponent } from './group-remove.component';

describe('GroupRemoveComponent', () => {
  let component: MspDirectUpdateGroupRemoveComponent;
  let fixture: ComponentFixture<MspDirectUpdateGroupRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspDirectUpdateGroupRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspDirectUpdateGroupRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
