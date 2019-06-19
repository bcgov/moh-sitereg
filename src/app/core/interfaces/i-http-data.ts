// import { PayloadInterface } from '@core/models/api.models';

//#region Core / Common

export interface ICoreUserDef {

    first_name: string;
    last_name: string;
    job_title: string;
    email: string;
    phone_num: string;
    spg: string;

    curtesy_title?: string;
    initial?: string;
    phone_ext?: string;
    fax_num?: string;
}

export interface ICoreUserMspDef extends ICoreUserDef {
    msp_access: string;

    ldap_id?: string;
}

export interface IContractingOut {
    contracting_third_party: string;
    third_party_org_num?: string;
}

/**
 * should be removed with latest defination
 */
export interface IUserDef extends ICoreUserMspDef {
    user_spg: string;
}

//#endregion

//#region Organization

export interface IOrgInformationDef {
    org_name: string;

    street_num: string;
    street_name: string;
    city: string;
    province: string;
    postal_code: string;

    blue_cross: string;
    org_spg: string;

    contracting_out: IContractingOut;

    org_num?: string;
    suite_num?: string;
    address_2?: string;
}

//#endregion

//#region signing_authority_def

// tslint:disable-next-line: no-empty-interface
export interface ISigningAuthorityDef extends ICoreUserMspDef { }

//#endregion

//#region Access Admin

// tslint:disable-next-line: no-empty-interface
export interface IAccessAdministratorDef extends ICoreUserMspDef { }

//#endregion

//#region Users

// tslint:disable-next-line: no-empty-interface
export interface IUserDef extends ICoreUserDef { }

//#endregion

//#region Msp Group

export interface IMspGroupDef {
    mspgroup_num: string;
    mspgroup_name: string;
    third_party: string;
}

//#endregion

export interface ISiteRegRequest {
    request_uuid: string;
    request_num: any;
    org_information: IOrgInformationDef;
    signing_authority_information: ISigningAuthorityDef;
    msp_group: IMspGroupDef[];
    authorizedBySA: string;
    authorizedDate: string;
    aa_same_as_sa: string; // ^[YN]$
    access_administrator: IAccessAdministratorDef[];
    users?: IUserDef[];
    applicationType?: string;
}

export type YesNo = 'yes' | 'no';
