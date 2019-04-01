import { IUserMsp } from './base/i-user-msp';

export interface IMspAccessAdmins {
    admins: IMspAccessAdmin[];
}

// tslint:disable-next-line: no-empty-interface
export interface IMspAccessAdmin extends IUserMsp {}
