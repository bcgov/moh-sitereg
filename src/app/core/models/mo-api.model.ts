import { PayloadInterface, ServerPayload } from './api-base.model';
import {
    IOrgInformationDef,
    ISigningAuthorityDef,
    IAccessAdministratorDef,
    IUserDef,
    IMspGroupDef,
} from '@core/interfaces/i-http-data';

export interface ISiteRegRequest2 extends PayloadInterface {
    request_num: any;
    org_information: IOrgInformationDef;
    signing_authority_information: ISigningAuthorityDef;
    aa_same_as_sa: string; // ^[YN]$
    access_administrator: IAccessAdministratorDef[];
    users: IUserDef[];
    msp_group: IMspGroupDef[];
}

export class SiteRegRequest2 extends ServerPayload {
    // tslint:disable: variable-name
    request_num: any;
    org_information: IOrgInformationDef;
    signing_authority_information: ISigningAuthorityDef;
    aa_same_as_sa: string; // ^[YN]$
    access_administrator: IAccessAdministratorDef[];
    users: IUserDef[];
    msp_group: IMspGroupDef[];

    constructor(payload: ISiteRegRequest2) {
        super(payload);
    }
}
