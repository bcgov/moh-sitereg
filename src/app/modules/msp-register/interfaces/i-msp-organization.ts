import { FormControl } from '@angular/forms';

export interface IMspOrganization {
    // organizationNumber: string | FormControl; // TBD: opt-out, this is MSP group number
    name: string | FormControl;
    suite: string | FormControl;
    street: string | FormControl;
    streetName: string | FormControl;
    addressLine2: string | FormControl;
    city: string | FormControl;
    province: string | FormControl;
    postalCode: string | FormControl;
    thirdParty: boolean | FormControl;
    blueCross: boolean | FormControl;
    administeringFor: string | FormControl;
}
