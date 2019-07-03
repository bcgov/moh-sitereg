import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspDirectUpdateGroupAddComponent } from './group-add.component';

describe('GroupRemoveComponent', () => {
  let component: MspDirectUpdateGroupAddComponent;
  let fixture: ComponentFixture<MspDirectUpdateGroupAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspDirectUpdateGroupAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspDirectUpdateGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
