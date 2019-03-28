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

export interface IContractingOut {
    contracting_third_party: YesNo;
    third_party_org_num?: string;
}

export interface ICoreUserDef {
    sa_curtesy_title?: string;
    sa_last_name: string;
    sa_first_name: string;
    sa_initial?: string;
    sa_job_title: string;
    sa_email: string;
    sa_phone_num: string;
    sa_phone_ext?: string;
    sa_fax_num?: string;
}

//#region signing_authority_def

export interface ISigningAuthorityDef extends ICoreUserDef {
    sa_msp_access: string;
    sa_spg: string;
    sa_ldap_id: string;
}

//#endregion

//#region signing_authority_def

export interface IAccessAdministratorDef extends ICoreUserDef {
    aa_msp_access: string;
    aa_spg: string;
    aa_ldap_id: string;
}

//#endregion

export interface IUserDef extends ICoreUserDef {
    user_spg: string;
}

export interface IMspGroupDef {
    mspgroup_num: string;
    third_party: YesNo;
}

export interface ISiteregRequest {
    org_information: IOrgInformationDef;
    signing_authority: ISigningAuthorityDef;
    access_administrator_present: IAccessAdministratorDef[];
    users: IUserDef[];
    msp_group: IMspGroupDef;
}

export type YesNo = 'yes' | 'no';
