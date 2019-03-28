import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspRegisterUserMspComponent } from './msp-register-user-msp.component';

describe('MspRegisterPersonWithAccessComponent', () => {
    let component: MspRegisterUserMspComponent;
    let fixture: ComponentFixture<MspRegisterUserMspComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MspRegisterUserMspComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MspRegisterUserMspComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
