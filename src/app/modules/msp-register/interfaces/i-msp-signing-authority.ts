import { IUser } from './i-user';

export interface IMspSigningAuthority extends IUser {
  directAccess: boolean;
  alsoAdmin: string;
}

