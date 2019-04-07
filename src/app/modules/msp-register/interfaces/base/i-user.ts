import { FormControl } from '@angular/forms';

export interface IUser {
    userTitle?: string | FormControl;
    firstName: string | FormControl;
    initial?: string | FormControl;
    lastName: string | FormControl;
    jobTitle: string | FormControl;
    emailAddress: string | FormControl;
    phone: string | FormControl;
    ext?: string | FormControl;
    fax: string | FormControl;
    administeringFor: string | FormControl;
}
