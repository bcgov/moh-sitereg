import { GenerateForm } from './generate-form';
import {
    IMspOrganization,
    IMspSigningAuthority,
} from '@msp-register/interfaces';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import {
    required,
    maxLength,
    minLength,
    phoneValidator,
    faxValidator,
} from './validator-helpers';
import {
    ctFormControlString,
    ctFormControlBoolean,
    ctFormControlUserTitle,
    cUserMspValidators,
} from './core/core-types';
import { GlobalConfigService } from '@shared/services/global-config.service';

export class MspRegisterSigningAuthority
    extends GenerateForm<IMspSigningAuthority>
    implements IMspSigningAuthority {
    userTitle?: ctFormControlUserTitle = null;
    firstName: ctFormControlString = null;
    initial?: ctFormControlString = null;
    lastName: ctFormControlString = null;
    jobTitle: ctFormControlString = null;
    emailAddress: ctFormControlString = null;
    confirmEmail: ctFormControlString = null;
    phone: ctFormControlString = null;
    ext?: ctFormControlString = null;
    fax: ctFormControlString = null;
    administeringFor: ctFormControlString = null;
    directMspAccess: ctFormControlBoolean = false;

    get validators() {
        return cUserMspValidators;
    }

    constructor(
        private gf: GenerateForm<IMspOrganization>,
        private newFb: FormBuilder
    ) {
        super(newFb);
        const valid = new FormControl('', Validators.required);

        // REMOVEME - debug only
        this.setDefaultValues();
    }

    //#region REMOVE ME - Default Values

    private setDefaultValues() {
        if (GlobalConfigService.setDefaults) {
            this.userTitle = 'Mr.';
            this.firstName = 'Josh';
            this.initial = 'K';
            this.lastName = 'Bratchley';
            this.jobTitle = 'Senior Diver';
            this.emailAddress = 'josh.bratchley@maximusbc.ca';
            this.confirmEmail = 'josh.bratchley@maximusbc.ca';
            this.phone = '2508129651';
            this.ext = '3';
            this.fax = '2508129659';
            this.administeringFor = 'Employees';
            this.directMspAccess = true;
        }
    }

    //#endregion
}
