import { IUser } from './base/i-user';

// tslint:disable-next-line: no-empty-interface
export interface IMspUser extends IUser {}

export interface IMspUsers {
    users: IMspUser[];
}
