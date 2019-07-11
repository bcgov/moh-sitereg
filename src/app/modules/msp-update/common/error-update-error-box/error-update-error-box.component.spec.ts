import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspDirectUpdateErrorBoxComponent } from './error-update-error-box.component';

describe('MspDirectUpdateErrorBoxComponent', () => {
    let component: MspDirectUpdateErrorBoxComponent;
    let fixture: ComponentFixture<MspDirectUpdateErrorBoxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MspDirectUpdateErrorBoxComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MspDirectUpdateErrorBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
