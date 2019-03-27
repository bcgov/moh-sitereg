import { IUser } from './i-user';
import { FormControl } from '@angular/forms';

export interface IMspSigningAuthority extends IUser {
    directAccess: boolean | FormControl;
}
