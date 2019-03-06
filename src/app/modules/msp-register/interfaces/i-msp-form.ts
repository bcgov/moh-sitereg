import { IMspAccessAdmins } from './i-msp-access-admins';
import { IMspGroupNumbers } from './i-msp-group-numbers';
import { IMspOrganization } from './i-msp-organization';
import { IMspAuthorize } from './i-msp-authorize';
import { IMspUsers } from './i-msp-users';
import { IMspSigningAuthority } from './i-msp-signing-authority';
import { FormControl } from '@angular/forms';

export interface IMspForm {
  accessAdmins: IMspAccessAdmins | FormControl;
  groupNumbers: IMspGroupNumbers | FormControl;
  organization: IMspOrganization | FormControl;
  authorize: IMspAuthorize | FormControl;
  users: IMspUsers | FormControl;
  signingAuthority: IMspSigningAuthority | FormControl;
}
