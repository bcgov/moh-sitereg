import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspDirectUpdateAccessAdministratorEditComponent } from './access-admin-edit.component';

describe('AccessAdminDupdateComponent', () => {
  let component: MspDirectUpdateAccessAdministratorEditComponent;
  let fixture: ComponentFixture<MspDirectUpdateAccessAdministratorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MspDirectUpdateAccessAdministratorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MspDirectUpdateAccessAdministratorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
