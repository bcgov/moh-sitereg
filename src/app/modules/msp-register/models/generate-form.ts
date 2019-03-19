import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
  ValidatorFn
} from '@angular/forms';
import { IMspOrganization, MSPValidForms } from '@msp-register/interfaces';
import { validatorOpts } from './validator-helpers';
type valueof<T> = T[keyof T];
const ctrKeys = ['fb', 'gf', 'newFb'];

interface IControls {
  name: string;
  control: FormControl;
}

const validKeys = ['string'];

export class GenerateForm<T> {
  keys: string[];
  validateKeys([...args]): string[] {
    const keys = args.filter(itm => validKeys.includes(itm)) as string[];
    return keys;
  }

  generateArr(keys: string[], validators): IControls[] {
    let arr = [];
    for (const key of keys) {
      arr = this.genControls(key, arr, new FormControl('', validators[key]));
    }
    return arr;
  }
  genForms<U>(arr: IControls[]): U {
    const obj = {};
    arr.forEach((itm, array, i) => {
      obj[itm.name] = itm.control;
    });
    return obj as U;
  }

  genControls(
    name: string,
    arr: IControls[],
    control: FormControl = new FormControl('', [])
  ): IControls[] {
    arr.push({ name, control } as IControls);
    return arr;
  }

  pushData(text: string, control: FormControl) {
    return control.setValue(text);
  }

  addValidator(control: string, validators: ValidatorFn[], fg: FormGroup) {
    const arr = [];
    fg.controls[control].setValidators(validators);
  }

  constructor(private fb: FormBuilder) {}

  get genKeys() {
    const keys = Object.keys(this).filter(key => !ctrKeys.includes(key));
    return keys;
  }
}
