import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspDirectUpdateUserComponent } from './user.component';

describe('MspDirectUpdateUserComponent', () => {
    let component: MspDirectUpdateUserComponent;
    let fixture: ComponentFixture<MspDirectUpdateUserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MspDirectUpdateUserComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MspDirectUpdateUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
