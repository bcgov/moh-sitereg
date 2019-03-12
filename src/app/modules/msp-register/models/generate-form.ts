import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IMspOrganization, MSPValidForms } from '@msp-register/interfaces';
type valueof<T> = T[keyof T];
const ctrKeys = ['fb', 'gf', 'newFb'];

interface IControls {
  name: string;
  control: FormControl;
}

const validKeys = [ 'string' ]

export class GenerateForm<T>  {
  keys: string[];

  validateKeys([...args]): string[] {
    const keys = args.filter(itm => validKeys.includes(itm)) as string[];
    return keys;
  }

   generateArr(keys: string[]): IControls[] {
    let arr = [];
    for (let key of keys) {
      arr = this.genControls(key, arr);
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


  genControls(name: string, arr: IControls[],  control: FormControl = new FormControl('', [])): IControls[] {
    arr.push({ name, control} as IControls);
    return arr;
  }

  pushData(text: string, control: FormControl) {
    return control.setValue(text);
  }

  constructor(
    private fb: FormBuilder,
  ) {

  }

  get genKeys() {
    const keys =  Object.keys(this).filter(key => !ctrKeys.includes(key));
    return keys;
  }
  }
