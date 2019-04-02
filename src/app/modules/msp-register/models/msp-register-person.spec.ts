import { MspRegisterPerson } from './core/msp-register-person';
import { GenerateForm } from './generate-form';
import { FormBuilder } from '@angular/forms';

describe('MspRegisterPerson', () => {
    it('should create an instance', () => {
        const fb = new FormBuilder();
        const gf = new GenerateForm(fb);
        expect(new MspRegisterPerson(gf, fb)).toBeTruthy();
    });
});
