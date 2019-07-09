import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspDirectUpdateAccessAdministratorRemoveComponent } from './access-admin-remove.component';

describe('AccessAdminEditComponent', () => {
  let component: MspDirectUpdateAccessAdministratorRemoveComponent;
  let fixture: ComponentFixture<MspDirectUpdateAccessAdministratorRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspDirectUpdateAccessAdministratorRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspDirectUpdateAccessAdministratorRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
