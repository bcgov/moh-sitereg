import { FormControl } from '@angular/forms';
import { IUser } from './i-user';

export interface IUserMsp extends IUser {
    directMspAccess: boolean | FormControl;
}
