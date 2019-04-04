//#region Core / Common

export interface ICoreUserDef {
    curtesy_title?: string;
    last_name: string;
    first_name: string;
    initial?: string;
    job_title: string;
    email: string;
    phone_num: string;
    phone_ext?: string;
    fax_num?: string;
    spg: string;
}

export interface ICoreUserMspDef extends ICoreUserDef {
    msp_access: string;
    ldap_id: string;
}

export interface IContractingOut {
    contracting_third_party: YesNo;
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
    org_num: string;
    suite_num: string;
    street_num: string;
    street_name: string;
    address_2: string;
    city: string;
    province: string;
    postal_code: string;
    blue_cross: string;
    org_spg: string;
    contracting_out: IContractingOut;
}

//#endregion

//#region signing_authority_def

// tslint:disable-next-line: no-empty-interface
export interface ISigningAuthorityDef extends ICoreUserMspDef {}

//#endregion

//#region Access Admin

// tslint:disable-next-line: no-empty-interface
export interface IAccessAdministratorDef extends ICoreUserMspDef {}

//#endregion

//#region Users

// tslint:disable-next-line: no-empty-interface
export interface IUserDef extends ICoreUserDef {}

//#endregion

//#region Msp Group

export interface IMspGroupDef {
    mspgroup_num: string;
    mspgroup_name: string;
    third_party: string;
}

//#endregion

export interface ISiteRegRequest {
    request_num: any;
    org_information: IOrgInformationDef;
    signing_authority_information: ISigningAuthorityDef;
    aa_same_as_sa: string; // ^[YN]$
    access_administrator: IAccessAdministratorDef[];
    users: IUserDef[];
    msp_group: IMspGroupDef[];
}

export type YesNo = 'yes' | 'no';
