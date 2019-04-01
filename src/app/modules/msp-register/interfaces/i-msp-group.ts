import { FormControl } from '@angular/forms';

export interface IMspGroup {
    groupNumber: string | FormControl;
    groupName: string | FormControl;
    thirdParty: boolean | FormControl;
}
