import { GenerateForm } from './generate-form';
import { FormBuilder } from '@angular/forms';
import { IMspOrganization } from '@msp-register/interfaces';

describe('GenerateForm', () => {
  it('should create an instance', () => {
    const fb = new FormBuilder();
    const gf = new GenerateForm(fb);

    expect(gf).toBeTruthy();
  });
  it('should return an array of controls', () => {
    const fb = new FormBuilder();
    const gf = new GenerateForm(fb);
    const arr = gf.generateArr(['name']);
    expect(arr).toBeDefined();
    expect(arr.length).toBe(1);
    expect(arr[0].name).toBe('name');
  });
  it('should return a properly structured form control', () => {
    const fb = new FormBuilder();
    const gf = new GenerateForm(fb);
    const data = [
      'name',
      'address',
      'city',
      'province',
      'postalCode',
      'thirdParty',
      'blueCross',
      'administeringFor',
     ];
    const arr = gf.generateArr(data);
    const forms = gf.genForms<IMspOrganization>(arr);
    expect(forms).toBeDefined();
    expect(typeof forms.name === 'object').toBeTruthy();
    expect(Object.keys(forms).length).toBe(8);
    expect(Object.keys(forms).filter(itm => !data.includes(itm)).length).toBe(0);
  });
});
