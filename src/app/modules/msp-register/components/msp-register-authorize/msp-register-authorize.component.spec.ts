import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MspRegisterAuthorizeComponent } from './msp-register-authorize.component';
import { SharedModule } from '@shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MspRegisterAuthorizeAccessComponent } from '../msp-register-authorize-access/msp-register-authorize-access.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MspRegisterAuthorizeComponent', () => {
    let component: MspRegisterAuthorizeComponent;
    let fixture: ComponentFixture<MspRegisterAuthorizeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MspRegisterAuthorizeComponent,
                MspRegisterAuthorizeAccessComponent,
            ],
            imports: [
                SharedModule,
                RouterTestingModule,
                HttpClientTestingModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MspRegisterAuthorizeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
