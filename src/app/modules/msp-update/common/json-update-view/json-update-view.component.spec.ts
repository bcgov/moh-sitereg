import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonUpdateViewComponent } from './json-update-view.component';

describe('JsonUpdateViewComponent', () => {
  let component: JsonUpdateViewComponent;
  let fixture: ComponentFixture<JsonUpdateViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonUpdateViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonUpdateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
