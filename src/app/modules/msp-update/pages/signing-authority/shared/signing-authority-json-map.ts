import * as jsonUserMaps from '../../../common/update-json-user-map';
import { actionType, deepCopy, addDefinationProperty } from '../../../common/update-json-map';
import { getISigningAuthority } from './i-signing-authority';

export function getAddJsonOfSigningAuthority(formValues) {
    if (!formValues) return;
    // signing_authority_added : signing_authority_def

    // commented schema requires reauisite field must be present
    // const isAdmin = formValues.isAdmin && formValues.isAdmin === true ? true : false;
    // let json = isAdmin ?
    //     jsonMaps.mapJsonCoreUser(actionType.Add, formValues) :
    //     jsonMaps.mapJsonCoreUserGeneralInfo(actionType.Add, formValues);
    let json = jsonUserMaps.mapJsonCoreUser(actionType.Add, formValues);
    const isAdmin = formValues.isAdmin && formValues.isAdmin === true ? true : false;
    json.is_admin = isAdmin;
    json.msp_access = isAdmin === true ? 'Y' : 'N'; // spg become required in Yes case - that must have value administeringFor(spg)

    delete json.confirm_email;
    // chnage role is not implementing on signing authority
    delete json.change_role;

    json = deepCopy(json, 'sa_');

    json = addDefinationProperty(json, 'signing_authority_def');
    const jsonDef: any = { signing_authority_added: {} };
    jsonDef.signing_authority_added = json;
    return jsonDef;
}


export function getAddJSONofSigningAuthority(formValue) {

    if (!formValue) return;
    const formValuesArray = getISigningAuthority(formValue);

    const jsonArray: any[] = [];
    formValuesArray.forEach(formValues => {

        let json = jsonUserMaps.mapJsonCoreUser(actionType.Add, formValues);
        // const isAdmin = formValues.isAdmin && formValues.isAdmin === true ? true : false;
        // json.is_admin = isAdmin;
        // json.msp_access = isAdmin === true ? 'Y' : 'N'; // spg become required in Yes case - that must have value administeringFor(spg)

        delete json.confirm_email;
        delete json.change_role;
        // json.msp_access = 'Y';
        json = deepCopy(json, 'sa_');

        jsonArray.push(json);
    });

    return jsonArray;
}

export function getEditJsonOfSigningAuthority(formValues) {
    if (!formValues) return;
    // signing_authority_removed : person_id_def

    // commented schema requires reauisite field must be present

    // const isAdmin = formValues.isAdmin && formValues.isAdmin === true ? true : false;
    // let json = isAdmin ?
    //     jsonMaps.mapJsonCoreUser(actionType.Edit, formValues) :
    //     jsonMaps.mapJsonCoreUserGeneralInfo(actionType.Edit, formValues);

    let json = jsonUserMaps.mapJsonCoreUser(actionType.Edit, formValues);
    const isAdmin = formValues.isAdmin && formValues.isAdmin === true ? true : false;
    json.is_admin = isAdmin;
    // if not admin msp_access is N and spg become optional remove spg
    if (isAdmin === false) json.msp_access = 'N'; // there should not be spg property.

    delete json.change_role;

    json.user = addDefinationProperty(json.user, 'person_id_def');
    json = deepCopy(json, 'sa_');

    console.clear();
    console.log(json);

    // json.user = jsonMaps.addDefinationProperty(json.user, 'person_id_def');

    return json;
}


export function getEditJSONofSigningAuthority(formValue) {
    if (!formValue) return;
    const formValuesArray = getISigningAuthority(formValue);
    const jsonArray: any[] = [];
    formValuesArray.forEach(formValues => {

        let json = jsonUserMaps.mapJsonCoreUser(actionType.Edit, formValues);

        delete json.change_role;
        delete json.confirm_email;
        // const isAdmin = formValues.isAdmin && formValues.isAdmin === true ? true : false;
        // json.is_admin = isAdmin;
        // if (isAdmin === false) json.msp_access = 'N'; // there should not be spg property.
        // const isAdmin = formValues.isAdmin && formValues.isAdmin === true ? true : false;
        // json.is_admin = isAdmin;
        // // if not admin msp_access is N and spg become optional remove spg
        // if (isAdmin === false) json.msp_access = 'N'; // there should not be spg property.
        json = deepCopy(json, 'sa_');
        jsonArray.push(json);
    });

    return jsonArray;
}

export function getRemoveJsonOfSigningAuthority(formValues) {

    // signing_authority_removed : person_id_def
    let json = jsonUserMaps.mapJsonCoreUserGeneralInfo(actionType.Remove, formValues);
    json = addDefinationProperty(json, 'person_id_def');
    const jsonDef: any = { signing_authority_removed: {} };
    jsonDef.signing_authority_removed = json;
    return jsonDef;

}

export function getRemoveJSONofSigningAuthority(formValue) {
    if (!formValue) return;
    const formValuesArray = getISigningAuthority(formValue);
    const jsonArray: any[] = [];
    formValuesArray.forEach(formValues => {

        const json = jsonUserMaps.mapJsonCoreUser(actionType.Remove, formValues);

        jsonArray.push(json);
    });

    return jsonArray;
}
