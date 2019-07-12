import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspDirectUpdateRequestorComponent } from './requestor.component';

describe('IdentifyComponent', () => {
    let component: MspDirectUpdateRequestorComponent;
    let fixture: ComponentFixture<MspDirectUpdateRequestorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MspDirectUpdateRequestorComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MspDirectUpdateRequestorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
