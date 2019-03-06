import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IMspOrganization, MSPValidForms } from '@msp-register/interfaces';
type valueof<T> = T[keyof T];

type IValidKeys = string;

interface IControls {
  name: string;
  control: FormControl;
}

const validKeys = [ 'string' ]
// radios.items.map(item => item.toUpperCase());

export class GenerateForm<T, K extends keyof T>  {
  keys: IValidKeys[];

  validateKeys([...args]): IValidKeys[] {
    const keys = args.filter(itm => validKeys.includes(itm)) as IValidKeys[];
    return keys;
  }

   generateArr(keys: IValidKeys[], callback): IControls[] {
    let arr = [];
    for(let key of keys) {
      arr = this.genControls(key, arr);
     }
     return arr;
  }
  genForms<U>(arr: IControls[]): U {
    const obj = {};
    arr.forEach((itm, arr, i) => {

      obj[itm.name] = itm.control;
    });
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
