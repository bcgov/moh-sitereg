import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspRegisterGroupComponent } from './msp-register-group.component';
import { SharedModule } from '@shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('MspRegisterGroupNumbersComponent', () => {
    let component: MspRegisterGroupComponent;
    let fixture: ComponentFixture<MspRegisterGroupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MspRegisterGroupComponent],
            imports: [SharedModule, RouterTestingModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MspRegisterGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
