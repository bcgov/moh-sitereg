import { IMspAccessAdmins } from './i-msp-access-admins';
import { IMspGroup } from './i-msp-group';
import { IMspOrganization } from './i-msp-organization';
import { IMspAuthorize } from './i-msp-authorize';
import { IMspUsers } from './i-msp-users';
import { IMspSigningAuthority } from './i-msp-signing-authority';
import { FormControl } from '@angular/forms';

export interface IMspForm {
    accessAdmins: IMspAccessAdmins | FormControl;
    groupNumbers: IMspGroup | FormControl;
    organization: IMspOrganization | FormControl;
    authorize: IMspAuthorize | FormControl;
    users: IMspUsers | FormControl;
    signingAuthority: IMspSigningAuthority | FormControl;
}
