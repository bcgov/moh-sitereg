import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspDirectUpdateGroupEditComponent } from './group-edit.component';

describe('GroupRemoveComponent', () => {
  let component: MspDirectUpdateGroupEditComponent;
  let fixture: ComponentFixture<MspDirectUpdateGroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspDirectUpdateGroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspDirectUpdateGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
