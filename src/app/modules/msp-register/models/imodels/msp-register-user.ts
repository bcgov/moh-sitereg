import { CoreUser } from '../core/core-user';
import { IMspUser } from '@msp-register/interfaces/i-msp-user';
import { cUserValidators } from '../core/core-types';

export class MspUser extends CoreUser implements IMspUser {
    // CoreUser - validator method is not mixin, therefore this needs to declare manually
    get validators(): any {
        return cUserValidators;
    }
}
