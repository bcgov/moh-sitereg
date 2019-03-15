export interface IOrgInformationDef {
  org_name: string;
  org_num: string;
  suite_num: string;
  street_num: string;
  address_2: string;
  city: string;
  province: string;
  postal_code: string;
  contracting_out: IContractingOut;
}

export interface IContractingOut {
  contracting_third_party: YesNo;
  third_party_org_num?: string;
}

export interface ICoreUserDef {
  sa_curtesy_title?: string;
  sa_last_name: string;
  sa_initial?: string;
  sa_job_title: string;
  sa_email: string;
  sa_phone_num: string;
  sa_phone_ext?: string;
  sa_fax_num?: string;
}

export interface ISigningAuthorityInformationDef extends ICoreUserDef {
  sa_msp_access: YesNo;
  sa_spg: string;
}

export interface IAccessAdministratorPresentDef extends ICoreUserDef {
  aa_msp_access: YesNo;
  aa_spg: string;
}

export interface IUserDef extends ICoreUserDef {
  user_spg: string;
}

export interface IMspGroupDef {
  mspgroup_num: string;
  third_party: YesNo;
}

export interface ISiteregRequest {
  org_information: IOrgInformationDef;
  signing_authority_information: ISigningAuthorityInformationDef;
  access_administrator_present: IAccessAdministratorPresentDef[];
  users: IUserDef;
  msp_group: IMspGroupDef;
}

export type YesNo = 'yes' | 'no';
