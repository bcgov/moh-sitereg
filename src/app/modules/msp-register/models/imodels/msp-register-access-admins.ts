import { CoreUser } from '../core/core-user';
import { IMspUser } from '@msp-register/interfaces/i-msp-user';
import { cUserValidators } from '../core/core-types';
import { CoreUserMsp } from '../core/core-user-msp';
import { IMspAccessAdmin } from '@msp-register/interfaces/i-msp-access-admins';

export class MspAccessAdmin extends CoreUserMsp implements IMspAccessAdmin {
    // CoreUser - validator method is not mixin, therefore this needs to declare manually
    get validators(): any {
        return cUserValidators;
    }
}
