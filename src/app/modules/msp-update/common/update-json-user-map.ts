
import * as jsonMaps from './update-json-map';

//#region JSON Mapping


export function mapJsonCoreUserGeneralInfo(userAction: jsonMaps.actionType, formValues) {
    if (!formValues) return;

    console.log(formValues);
    const json: any = {};

    if (userAction === jsonMaps.actionType.Add) {
        console.log('mapJson - ' + userAction);

        json.firstName = formValues.firstName ? formValues.firstName : '';
        json.lastName = formValues.lastName ? formValues.lastName : '';
        json.jobTitle = formValues.jobTitle ? formValues.jobTitle : '';
        json.emailAddress = formValues.emailAddress ? formValues.emailAddress : '';
        json.confirmEmail = formValues.confirmEmail ? formValues.confirmEmail : '';
        json.phone = formValues.phone ? formValues.phone : '';

        // Optional
        if (jsonMaps.isValidOptionalField(formValues.userTitle)) json.curtesy_title = formValues.userTitle;
        if (jsonMaps.isValidOptionalField(formValues.initial)) json.initial = formValues.initial;
        if (jsonMaps.isValidOptionalField(formValues.ext)) json.ext = formValues.ext;
        if (jsonMaps.isValidOptionalField(formValues.fax)) json.fax = formValues.fax;

        json.msp_access = formValues.changeAdministerFor && formValues.changeAdministerFor === true ? 'Y' : 'N';
    }

    if (userAction === jsonMaps.actionType.Edit) {
        console.log('mapJson - ' + userAction);

        json.email = formValues && formValues.forIdentifyEmailAddress ? formValues.forIdentifyEmailAddress : '';
        if (jsonMaps.isValidOptionalField(formValues.forIdentifyMinistryUserId)) json.id = formValues.forIdentifyMinistryUserId;

        // Optional - in Add
        if (jsonMaps.isValidOptionalField(formValues.userTitle)) json.curtesy_title = formValues.userTitle;
        if (jsonMaps.isValidOptionalField(formValues.initial)) json.initial = formValues.initial;
        if (jsonMaps.isValidOptionalField(formValues.ext)) json.ext = formValues.ext;
        if (jsonMaps.isValidOptionalField(formValues.fax)) json.fax = formValues.fax;

        // Optional - in Edit
        if (jsonMaps.isValidOptionalField(formValues.firstName)) json.curtesy_title = formValues.firstName;
        if (jsonMaps.isValidOptionalField(formValues.lastName)) json.initial = formValues.lastName;
        if (jsonMaps.isValidOptionalField(formValues.jobTitle)) json.ext = formValues.jobTitle;
        if (jsonMaps.isValidOptionalField(formValues.emailAddress)) json.fax = formValues.emailAddress;
        if (jsonMaps.isValidOptionalField(formValues.confirmEmail)) json.fax = formValues.confirmEmail;
        if (jsonMaps.isValidOptionalField(formValues.phone)) json.fax = formValues.phone;

        json.msp_access = formValues.changeAdministerFor && formValues.changeAdministerFor === true ? 'Y' : 'N';
    }

    if (userAction === jsonMaps.actionType.Remove) {
        console.log('mapJson - ' + userAction);
        json.email = formValues && formValues.emailAddress ? formValues.emailAddress : '';
        if (jsonMaps.isValidOptionalField(formValues.ministryUserId)) json.id = formValues.ministryUserId;
    }

    return json;
}


export function mapJsonCoreUser(userAction: jsonMaps.actionType, formValues) {
    if (!formValues) return;

    console.log(formValues);
    let json: any = {};
    json = mapJsonCoreUserGeneralInfo(userAction, formValues);

    if (userAction === jsonMaps.actionType.Add) {
        console.log('mapJsonCoreUser - ' + userAction);
        if (jsonMaps.isValidOptionalField(formValues.administeringFor)) {
            json.spg = jsonMaps.mapAdministeringForDef(formValues.administeringFor);
        }
        // json.spg = jsonMaps.mapAdministeringForDef(formValues.administeringFor);
    }

    if (userAction === jsonMaps.actionType.Edit) {
        console.log('mapJsonCoreUser - ' + userAction);

        json.change_role = jsonMaps.mapChangeRoleDef(formValues.changeRole);
        console.log('formValues.changeRole ' + formValues.changeRole);
        // json.msp_access = formValues.changeAdministerFor && formValues.changeAdministerFor === true ? 'Y' : 'N';
        // json.spg = jsonMaps.mapAdministeringForDef(formValues.administeringFor);
        if (jsonMaps.isValidOptionalField(formValues.administeringFor)) {
            json.spg = jsonMaps.mapAdministeringForDef(formValues.administeringFor);
        }
    }

    if (userAction === jsonMaps.actionType.Remove) {
        console.log('mapJsonCoreUser - ' + userAction);
    }

    return json;
}

// export function mapJsonCoreUser2(userAction: jsonMaps.actionType, formValues) {
//     if (!formValues) return;

//     console.log(formValues);
//     const json: any = {};

//     if (userAction === jsonMaps.actionType.Add) {
//         console.log('mapJson - ' + userAction);

//         json.firstName = formValues.firstName ? formValues.firstName : '';
//         json.lastName = formValues.lastName ? formValues.lastName : '';
//         json.jobTitle = formValues.jobTitle ? formValues.jobTitle : '';
//         json.emailAddress = formValues.emailAddress ? formValues.emailAddress : '';
//         json.confirmEmail = formValues.confirmEmail ? formValues.confirmEmail : '';
//         json.phone = formValues.phone ? formValues.phone : '';
//         json.spg = jsonMaps.mapAdministeringForDef(formValues.administeringFor);

//         // Optional
//         if (jsonMaps.isValidOptionalField(formValues.userTitle)) json.curtesy_title = formValues.userTitle;
//         if (jsonMaps.isValidOptionalField(formValues.initial)) json.initial = formValues.initial;
//         if (jsonMaps.isValidOptionalField(formValues.ext)) json.ext = formValues.ext;
//         if (jsonMaps.isValidOptionalField(formValues.fax)) json.fax = formValues.fax;
//     }

//     if (userAction === jsonMaps.actionType.Edit) {
//         console.log('mapJson - ' + userAction);

//         json.email = formValues && formValues.forIdentifyEmailAddress ? formValues.forIdentifyEmailAddress : '';
//         if (jsonMaps.isValidOptionalField(formValues.forIdentifyMinistryUserId)) json.id = formValues.forIdentifyMinistryUserId;

//         json.change_role = jsonMaps.mapChangeRoleDef(formValues.changeRole);
//         console.log('formValues.changeRole ' + formValues.changeRole);
//         json.msp_access = formValues.changeAdministerFor && formValues.changeAdministerFor === true ? 'Y' : 'N';
//         json.spg = jsonMaps.mapAdministeringForDef(formValues.administeringFor);

//         // Optional - in Add
//         if (jsonMaps.isValidOptionalField(formValues.userTitle)) json.curtesy_title = formValues.userTitle;
//         if (jsonMaps.isValidOptionalField(formValues.initial)) json.initial = formValues.initial;
//         if (jsonMaps.isValidOptionalField(formValues.ext)) json.ext = formValues.ext;
//         if (jsonMaps.isValidOptionalField(formValues.fax)) json.fax = formValues.fax;

//         // Optional - in Edit
//         if (jsonMaps.isValidOptionalField(formValues.firstName)) json.curtesy_title = formValues.firstName;
//         if (jsonMaps.isValidOptionalField(formValues.lastName)) json.initial = formValues.lastName;
//         if (jsonMaps.isValidOptionalField(formValues.jobTitle)) json.ext = formValues.jobTitle;
//         if (jsonMaps.isValidOptionalField(formValues.emailAddress)) json.fax = formValues.emailAddress;
//         if (jsonMaps.isValidOptionalField(formValues.confirmEmail)) json.fax = formValues.confirmEmail;
//         if (jsonMaps.isValidOptionalField(formValues.phone)) json.fax = formValues.phone;
//     }

//     if (userAction === jsonMaps.actionType.Remove) {
//         console.log('mapJson - ' + userAction);
//         json.email = formValues && formValues.emailAddress ? formValues.emailAddress : '';
//         if (jsonMaps.isValidOptionalField(formValues.ministryUserId)) json.id = formValues.ministryUserId;
//     }

//     return json;
// }


//#endregion
