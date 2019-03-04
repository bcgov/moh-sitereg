import { IUser } from './i-user';

export interface IMspAccessAdmins {
  admins: IMspAccessAdmin[];
}

export interface IMspAccessAdmin extends IUser {
  mspDirectAccess: boolean;
}

