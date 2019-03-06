import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IMspOrganization, MSPValidForms } from '@msp-register/interfaces';
type valueof<T> = T[keyof T];

interface IControls {
  name: string;
  control: FormControl;
}

const validKeys = [ 'string' ]
// radios.items.map(item => item.toUpperCase());

export class GenerateForm<T, K extends keyof T>  {
  keys: string[];

  validateKeys([...args]): string[] {
    const keys = args.filter(itm => validKeys.includes(itm)) as string[];
    return keys;
  }

   generateArr(keys: string[]): IControls[] {
    let arr = [];
    console.log(keys);
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
    console.log('object', JSON.stringify(obj, null, 2));
    return obj as U;
  }


  genControls(name: string, arr: IControls[],  control: FormControl = new FormControl('', [])): IControls[] {
    arr.push({ name, control} as IControls);
    return arr;
  }

  constructor(
    private fb: FormBuilder,
  ) {

    // this.keys = args.map(itm => {
      // if(itm instanceof validKeys>) return itm
    // })
  }


  }
