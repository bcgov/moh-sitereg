import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspRegisterGroupNumbersComponent } from './msp-register-group-numbers.component';
import { SharedModule } from '@shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('MspRegisterGroupNumbersComponent', () => {
    let component: MspRegisterGroupNumbersComponent;
    let fixture: ComponentFixture<MspRegisterGroupNumbersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MspRegisterGroupNumbersComponent],
            imports: [SharedModule, RouterTestingModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MspRegisterGroupNumbersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
