import { UpdateStateService } from '../../services/update.state.service';
// import * as appRequestor from '../requestor/shared/i-requestor';
// import * as appOrganization from '../organization/shared/i-organization';
// import * as appSA from '../signing-authority/shared/i-signing-authority';
// import * as appAA from '../access-admin/shared/i-access-admin';
// import * as appUser from '../user/shared/i-user';
// import * as appGroup from '../group/shared/i-group';
import * as appRequestor from '../requestor/shared/requestor-json-map';
import * as appOrganization from '../organization/shared/organization-json-map';
import * as appSA from '../signing-authority/shared/signing-authority-json-map';
import * as appAA from '../access-admin/shared/access-admin-json-map';
import * as appUser from '../user/shared/user-shared-json-map';
import * as appGroup from '../group/shared/group-shared-json-map';
import { isValidOptionalField } from '../../common/update-json-map';


export function jsonPayLoadApplication(stateService: UpdateStateService) {


    // console.clear();

    // payload  - requestor
    let requestor = null;
    if (stateService.forms.requestorForm) {
        // // // console.log(stateService.forms.requestorForm.value);
        requestor = appRequestor.getJSONofRequestor(stateService.forms.requestorForm.value, stateService.applicationId);
        // // console.log(requestor);
    }

    // payload  - organization edit
    let organization = null;
    if (stateService.forms.organizationForm) {
        // // console.log(stateService.forms.organizationForm.value);
        organization = appOrganization.getEditJSONofOrganization(stateService.forms.organizationForm.value);
        // // console.log(organization);
    }

    // Signing Authority

    // payload  - add
    let singingAuthorityAdd = null;
    if (stateService.forms.signingAuthority && stateService.forms.signingAuthority.add) {
        singingAuthorityAdd = appSA.getAddJSONofSigningAuthority(stateService.forms.signingAuthority.add.value);
        // // console.log(singingAuthorityAdd);
    }

    // payload  - edit
    let singingAuthorityEdit = null;
    if (stateService.forms.signingAuthority && stateService.forms.signingAuthority.update) {
        singingAuthorityEdit = appSA.getEditJSONofSigningAuthority(stateService.forms.signingAuthority.update.value);
        // // console.log(singingAuthorityEdit);
    }

    // payload  - remove
    let singingAuthorityRemove = null;
    if (stateService.forms.signingAuthority && stateService.forms.signingAuthority.remove) {
        singingAuthorityRemove = appSA.getRemoveJSONofSigningAuthority(stateService.forms.signingAuthority.remove.value);
        // // console.log(singingAuthorityRemove);
    }

    // Access Administrator

    // payload - add
    let accessAdministratorAdd = [];
    if (stateService.forms.mspAccessAdministrators && stateService.forms.mspAccessAdministrators.add) {
        accessAdministratorAdd = appAA.getAddJSONofAccessAdministrator(stateService.forms.mspAccessAdministrators.add.value);
        // // console.log(accessAdministratorAdd);
    }

    // payload  - edit
    let accessAdministratorEdit = [];
    if (stateService.forms.mspAccessAdministrators && stateService.forms.mspAccessAdministrators.update) {
        accessAdministratorEdit = appAA.getEditJSONofAccessAdministrator(stateService.forms.mspAccessAdministrators.update.value);
        // // console.log(accessAdministratorEdit);
    }

    // payload  - remove
    let accessAdministratorRemove = [];
    if (stateService.forms.mspAccessAdministrators && stateService.forms.mspAccessAdministrators.remove) {
        accessAdministratorRemove = appAA.getRemoveJSONofAccessAdministrator(stateService.forms.mspAccessAdministrators.remove.value);
        // // console.log(accessAdministratorRemove);
    }

    // Users

    // payload  - add
    let usersAdd = [];
    if (stateService.forms.mspUsers && stateService.forms.mspUsers.add) {
        usersAdd = appUser.getAddJSONofMspUser(stateService.forms.mspUsers.add.value);
        // // console.log(usersAdd);
    }


    // payload  - edit
    let usersEdit = [];
    if (stateService.forms.mspUsers && stateService.forms.mspUsers.update) {
        usersEdit = appUser.getEditJSONofMspUser(stateService.forms.mspUsers.update.value);
        // // console.log(usersEdit);
    }


    // payload  - remove
    let usersRemove = [];
    if (stateService.forms.mspUsers && stateService.forms.mspUsers.remove) {
        usersRemove = appUser.getRemoveJSONofMspUser(stateService.forms.mspUsers.remove.value);
        // // console.log(usersRemove);
    }


    // MSP Groups

    // payload  - add
    let groupsAdd = [];
    if (stateService.forms.mspGroups && stateService.forms.mspGroups.add) {
        groupsAdd = appGroup.getAddJSONofMspGroup(stateService.forms.mspGroups.add.value);
        // // console.log(groupsAdd);
    }

    // payload  - edit
    let groupsEdit = [];
    if (stateService.forms.mspGroups && stateService.forms.mspGroups.update) {
        groupsEdit = appGroup.getEditJSONofMspGroup(stateService.forms.mspGroups.update.value);
        // // console.log(groupsEdit);
    }

    // payload  - remove
    let groupsRemove = [];
    if (stateService.forms.mspGroups && stateService.forms.mspGroups.remove) {
        groupsRemove = appGroup.getRemoveJSONofMspGroup(stateService.forms.mspGroups.remove.value);
        // // console.log(groupsRemove);
    }

    // assign all
    const jsonPayLoad: IUpdateApplicationJson = {
        request_num: requestor.request_num,
        request_uuid: requestor.request_uuid,
        authorizedBySA: requestor.authorizedBySA,
        authorizedDate: requestor.authorizedDate,
        applicationType: requestor.applicationType,

        org_num: requestor.org_num,
        org_email: requestor.org_email,
    };

    // // console.log(organization);
    if (isValidOptionalField(organization)) jsonPayLoad.org_maintenance = organization;

    if (isValidOptionalField(singingAuthorityAdd)) jsonPayLoad.signing_authority_added = singingAuthorityAdd;
    if (isValidOptionalField(singingAuthorityEdit)) jsonPayLoad.signing_authority_updated = singingAuthorityEdit;
    if (isValidOptionalField(singingAuthorityRemove)) jsonPayLoad.signing_authority_removed = singingAuthorityRemove;

    if (isValidOptionalField(accessAdministratorAdd)) jsonPayLoad.access_administrator_added = accessAdministratorAdd;
    if (isValidOptionalField(accessAdministratorEdit)) jsonPayLoad.access_administrator_updated = accessAdministratorEdit;
    if (isValidOptionalField(accessAdministratorRemove)) jsonPayLoad.access_administrator_removed = accessAdministratorRemove;

    if (isValidOptionalField(usersAdd)) jsonPayLoad.users_added = usersAdd;
    if (isValidOptionalField(usersEdit)) jsonPayLoad.users_updated = usersEdit;
    if (isValidOptionalField(usersRemove)) jsonPayLoad.users_removed = usersRemove;

    if (isValidOptionalField(groupsAdd)) jsonPayLoad.msp_group_added = groupsAdd;
    if (isValidOptionalField(groupsEdit)) jsonPayLoad.msp_group_updated = groupsEdit;
    if (isValidOptionalField(groupsRemove)) jsonPayLoad.msp_group_removed = groupsRemove;

    // // assign all
    // const jsonPayLoad: IUpdateApplicationJson  = {
    //     request_num : requestor.request_num,
    //     request_uuid : requestor.request_uuid,
    //     authorizedBySA : requestor.authorizedBySA,
    //     authorizedDate: requestor.authorizedDate,
    //     applicationType: requestor.applicationType,

    //     org_num: requestor.org_num,
    //     org_email: requestor.org_email,

    //     org_maintenance: organization,

    //     signing_authority_added: singingAuthorityAdd,
    //     signing_authority_updated: singingAuthorityEdit,
    //     signing_authority_removed: singingAuthorityRemove,

    //     access_administrator_added: accessAdministratorAdd,
    //     access_administrator_updated: accessAdministratorEdit,
    //     access_administrator_removed: accessAdministratorRemove,

    //     users_added: usersAdd,
    //     users_removed: usersEdit,
    //     users_updated: usersRemove,

    //     msp_group_added: groupsAdd,
    //     msp_group_removed: groupsEdit,
    //     msp_group_updated: groupsRemove,
    // };

    return jsonPayLoad;
}

//#region Defination Maps


export interface IUpdateApplicationJson {

    request_uuid: string;
    request_num: string; // request_num_def
    authorizedBySA: string; // Y/N
    authorizedDate: string; //
    applicationType: string;

    org_num: string; // org_num_def
    org_email: string; // max-length: 100

    org_maintenance?: any; // org_maintenance_def

    signing_authority_added?: any; // signing_authority_def
    signing_authority_removed?: any; // person_id_def
    signing_authority_updated?: any; // signing_authority_def

    access_administrator_added?: any; // access_administrator_def
    access_administrator_removed?: any; // person_id_def
    access_administrator_updated?: any; // access_administrator_def

    users_added?: any; // users_def
    users_removed?: any; // person_id_def
    users_updated?: any; // users_def

    msp_group_added?: any; // msp_group_def
    msp_group_removed?: any; // person_id_def
    msp_group_updated?: any; // msp_group_def
}

// tslint:disable-next-line: class-name
export interface ji_person_id_def {
    email: string; // follows a pattern
    user_id?: string;
}

// tslint:disable-next-line: class-name
export interface ji_org_maintenance_def {

    // these should be optional
    org_name?: string;
    street_address?: string;
    city?: string;
    province?: string;
    postal_code?: string;
    org_spg?: string; // NEIB

    address_2?: string;
}


// tslint:disable-next-line: class-name
export interface ji_core_user_add_def {
    first_name: string;
    last_name: string;
    job_title: string;
    email: string;
    phone_num: string;
    msp_access: string;

    curtesy_title?: string;
    initial?: string;
    phone_ext?: string;
    fax_num?: string;
}

// tslint:disable-next-line: class-name
export interface ji_signing_authority_def extends ji_core_user_add_def {
    spg?: string;
}

// tslint:disable-next-line: class-name
export interface ji_access_administrator_def extends ji_core_user_add_def {
    spg: string;
}

// tslint:disable-next-line: class-name
export interface ji_user_def extends ji_core_user_add_def {
    spg: string;
}


// tslint:disable-next-line: class-name
export interface ji_core_user_update_def {
    user: ji_person_id_def;
    msp_access: string;

    first_name?: string;
    initial?: string;
    last_name?: string;

    job_title?: string; // NEIB
    email?: string;
    phone_num?: string;
    phone_ext?: string;
    fax_num?: string;
}

// tslint:disable-next-line: class-name
export interface ji_signing_authority_update_update_def extends ji_core_user_update_def {
    spg?: string;
}

// tslint:disable-next-line: class-name
export interface ji_access_administrator_update_def extends ji_core_user_update_def {
    change_role: string;
    spg?: string;
}

// tslint:disable-next-line: class-name
export interface ji_user_update_def extends ji_core_user_update_def {
    change_role: string;
    spg?: string;
}

// tslint:disable-next-line: class-name
export interface ji_msp_group_def {
    mspgroup_num: string;
    third_party: any;
}

// tslint:disable-next-line: class-name
export interface ji_msp_group_update_def {
    mspgroup_num: string;
    third_party: any;
}

//#endregion


//#region non-json models without


// tslint:disable-next-line: class-name
export interface ji_requestor_def {
    request_uuid: string;
    request_num: string; // request_num_def
    authorizedBySA: string; // Y/N

    authorizedDate: string; //
    applicationType: string;

    org_num: string; // org_num_def
    org_email: string; // max-length: 100
}

//#endregion 