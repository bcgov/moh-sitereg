import { IUser } from './i-user';
import { FormControl } from '@angular/forms';

export interface IMspAccessAdmins {
  admins: IMspAccessAdmin[];
}

export interface IMspAccessAdmin extends IUser {
  mspDirectAccess: boolean | FormControl;
}

