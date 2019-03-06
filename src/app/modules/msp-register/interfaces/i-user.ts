import { FormControl } from '@angular/forms';

export interface IUser {
  userTitle?: UserTitle | FormControl;
  firstName: string | FormControl;
  initial?: string | FormControl;
  lastName: string | FormControl;
  jobTitle: string | FormControl;
  emailAddress: string | FormControl;
  phone: string | FormControl;
  ext?: string | FormControl;
  fax: string | FormControl;
}
type UserTitle = 'mr' | 'mrs';
