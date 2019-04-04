import { FormControl } from '@angular/forms';

export interface IMspGroup {
    groupNumber: string | FormControl;
    thirdParty: boolean | FormControl;
}
