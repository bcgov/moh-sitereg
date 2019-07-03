import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspDirectUpdateAccessAdministratorComponent } from './access-admin.component';

describe('AccessAdministratorComponent', () => {
    let component: MspDirectUpdateAccessAdministratorComponent;
    let fixture: ComponentFixture<MspDirectUpdateAccessAdministratorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MspDirectUpdateAccessAdministratorComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MspDirectUpdateAccessAdministratorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
