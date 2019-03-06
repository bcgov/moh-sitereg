import { FormControl } from '@angular/forms';

export interface IMspOrganization {
  name: string | FormControl;
  address: string | FormControl;
  city: string | FormControl;
  province: string | FormControl;
  postalCode: string | FormControl;
  thirdParty: boolean | FormControl;
  blueCross: boolean | FormControl;
  administeringFor: string | FormControl;
}

