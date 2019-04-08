import {
    FormBuilder,
    FormControl,
    Validators,
    FormGroup,
    ValidatorFn,
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
    consolePrintForm = 'MspRegisterGroup';

    keys: string[];
    values = {};

    validateKeys([...args]): string[] {
        const keys = args.filter((itm) => validKeys.includes(itm)) as string[];
        return keys;
    }

    generateArr(keys: string[], validators): IControls[] {
        let arr = [];
        for (const key of keys) {
            if (this.constructor.name === this.consolePrintForm) {
                console.log(
                    `%c ${key} - %o <=  generateArr`,
                    `color:lightgreen`,
                    validators
                );
            }
            arr = this.genControls(
                key,
                arr,
                new FormControl(this.values[key], validators[key])
            );
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

    constructor(private fb: FormBuilder) {
        if (this.constructor.name === this.consolePrintForm) {
            // console.clear();
            console.log(
                `%c %o <= GenerateForm`,
                `color:darkgreen`,
                this.constructor.name
            );
        }
    }

    /**
     * generate class members as keys including GenerateForm
     */
    get genKeys() {
        const keys = Object.keys(this).filter((key) => !ctrKeys.includes(key));

        // updating default values if specified
        keys.forEach((element) => {
            Object.entries(this).filter((entry) => {
                if (entry.includes(element)) {
                    this.values[element] =
                        entry.length > 1 && typeof (entry[1] === 'string')
                            ? entry[1]
                            : null;
                }
            });

            // REMOVEME
            if (element === 'consolePrintForm') {
                keys.splice(keys.indexOf(element), 1);
            }
        });

        // REMOVEME
        if (this.constructor.name === this.consolePrintForm) {
            // console.clear();
            console.log(`%c %o <= values: genKeys`, `color:darkgreen`, this);

            console.log(
                `%c %o <= values: genKeys`,
                `color:darkgreen`,
                Object.values(this)
            );

            // Object.entries(this).filter((entry) => {
            //     console.log(`%c %o <= entry: genKeys`,
            //         `color:darkgreen`,
            //         // entry.includes('groupNumber')
            //         entry
            //     );
            // });

            console.log(
                `%c %o <= values: genKeys`,
                `color:darkgreen`,
                // entry.includes('groupNumber')
                this.values
            );
        }
        return keys;
    }
}
