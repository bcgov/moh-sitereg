import * as jsonMaps from '../../../common/update-json-user-map';
import { actionType, deepCopy } from '../../../common/update-json-map';

export function getAddJsonOfAccessAdministrator(formValues) {
    let json = jsonMaps.mapJsonCoreUser(actionType.Add, formValues);
    json.msp_access = 'Y';
    json = deepCopy(json, 'aa_');
    return json;
}

export function getEditJsonOfAccessAdministrator(formValues) {
    let json = jsonMaps.mapJsonCoreUser(actionType.Edit, formValues);
    // json.msp_access = 'Y';
    json = deepCopy(json, 'aa_');
    return json;
}

export function getRemoveJsonOfAccessAdministrator(formValues) {
    let json = jsonMaps.mapJsonCoreUser(actionType.Remove, formValues);
    json = deepCopy(json, 'aa_');
    return json;
}
