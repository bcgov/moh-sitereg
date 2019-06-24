import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessAdministratorComponent } from './access-administrator.component';

describe('AccessAdministratorComponent', () => {
    let component: AccessAdministratorComponent;
    let fixture: ComponentFixture<AccessAdministratorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AccessAdministratorComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccessAdministratorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
