import * as jsonMaps from '../../../common/update-json-user-map';
import { actionType, deepCopy } from '../../../common/update-json-map';

export function getAddJsonOfSigningAuthority(formValues) {
    if (!formValues) return;
    // commented schema requires reauisite field must be present
    // const isAdmin = formValues.isAdmin && formValues.isAdmin === true ? true : false;
    // let json = isAdmin ?
    //     jsonMaps.mapJsonCoreUser(actionType.Add, formValues) :
    //     jsonMaps.mapJsonCoreUserGeneralInfo(actionType.Add, formValues);
    let json = jsonMaps.mapJsonCoreUser(actionType.Add, formValues);
    const isAdmin = formValues.isAdmin && formValues.isAdmin === true ? true : false;
    json.is_admin = isAdmin;
    json.msp_access = isAdmin === true ? 'Y' : 'N'; // spg become required in Yes case - that must have value administeringFor(spg)

    delete json.change_role;

    json = deepCopy(json, 'sa_');
    return json;
}

export function getEditJsonOfSigningAuthority(formValues) {
    if (!formValues) return;
    // commented schema requires reauisite field must be present

    // const isAdmin = formValues.isAdmin && formValues.isAdmin === true ? true : false;
    // let json = isAdmin ?
    //     jsonMaps.mapJsonCoreUser(actionType.Edit, formValues) :
    //     jsonMaps.mapJsonCoreUserGeneralInfo(actionType.Edit, formValues);

    let json = jsonMaps.mapJsonCoreUser(actionType.Edit, formValues);
    const isAdmin = formValues.isAdmin && formValues.isAdmin === true ? true : false;
    json.is_admin = isAdmin;
    // if not admin msp_access is N and spg become optional remove spg
    if (isAdmin === false) json.msp_access = 'N'; // there should not be spg property.

    delete json.change_role;

    json = deepCopy(json, 'sa_');
    return json;
}

export function getRemoveJsonOfSigningAuthority(formValues) {
    let json = jsonMaps.mapJsonCoreUserGeneralInfo(actionType.Remove, formValues);
    json = deepCopy(json, 'sa_');
    return json;
}
