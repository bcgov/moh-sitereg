import { GenerateForm } from './generate-form';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IMspGroup } from '@msp-register/interfaces';
import { groupNumberValidator } from './validator-helpers';
import { ctFormControlString, ctFormControlBoolean } from './core/core-types';
import { GlobalConfigService } from '@shared/services/global-config.service';

export class MspRegisterGroup extends GenerateForm<IMspGroup>
    implements IMspGroup {
    groupNumber: ctFormControlString = null;
    thirdParty: ctFormControlBoolean = false;

    get validators() {
        return {
            groupNumber: [
                Validators.required,
                Validators.minLength(7),
                Validators.maxLength(7),
                groupNumberValidator(),
            ],
            thirdParty: [Validators.required],
        };
    }
    constructor(
        private gf: GenerateForm<IMspGroup>,
        private newFb: FormBuilder
    ) {
        super(newFb);

        // REMOVEME - debug only
        this.setDefaultValues();
    }

    //#region REMOVE ME - Default Values

    private setDefaultValues() {
        if (GlobalConfigService.setDefaults) {
            this.groupNumber = '7654321';
            this.thirdParty = true;
        }
    }

    //#endregion
}
