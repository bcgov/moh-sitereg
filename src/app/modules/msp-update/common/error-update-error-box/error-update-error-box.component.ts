import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { isRequiredError, validFormControl, validMultiFormControl } from 'src/app/modules/msp-update/common/validators';

@Component({
    selector: 'sitereg-update-error-box',
    templateUrl: './error-update-error-box.component.html',
    styleUrls: ['./error-update-error-box.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MspDirectUpdateErrorBoxComponent implements OnInit {
    @Input() formControlValidity: {
        required: boolean;
        other: boolean;
    };

    @Input() formControlLabel: string;
    @Input() errorMessage: string;


    get isError(): boolean {
        // console.log(this.formControlValidity);
        return (this.formControlValidity.required === true
            || this.formControlValidity.other === true) ? true : false;
    }

    constructor() { }

    ngOnInit() { }
}
