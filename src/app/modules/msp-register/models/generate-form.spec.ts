import { GenerateForm } from './generate-form';
import { FormBuilder } from '@angular/forms';

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
    expect(arr[0]).toContain('name');
    console.log(arr);
  })
});
