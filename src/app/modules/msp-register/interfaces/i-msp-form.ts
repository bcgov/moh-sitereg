import { IMspAccessAdmins } from './i-msp-access-admins';
import { IMspGroupNumbers } from './i-msp-group-numbers';
import { IMspOrganization } from './i-msp-organization';
import { IMspAuthorize } from './i-msp-authorize';
import { IMspUsers } from './i-msp-users';
import { IMspSigningAuthority } from './i-msp-signing-authority';

export interface IMspForm {
  accessAdmins: IMspAccessAdmins;
  groupNumbers: IMspGroupNumbers;
  organization: IMspOrganization;
  authorize: IMspAuthorize;
  users: IMspUsers;
  signingAuthority: IMspSigningAuthority;
}
