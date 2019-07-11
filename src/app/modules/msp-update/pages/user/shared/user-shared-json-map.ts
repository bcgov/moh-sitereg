import * as jsonMaps from '../../../common/update-json-user-map';
import { actionType, deepCopy } from '../../../common/update-json-map';

export function getAddJsonOfMspUser(formValues) {
    let json = jsonMaps.mapJsonCoreUser(actionType.Add, formValues);
    json = deepCopy(json, 'user_');
    return json;
}

export function getEditJsonOfMspUser(formValues) {
    let json = jsonMaps.mapJsonCoreUser(actionType.Edit, formValues);
    json = deepCopy(json, 'user_');
    return json;
}

export function getRemoveJsonOfMspUser(formValues) {
    let json = jsonMaps.mapJsonCoreUser(actionType.Remove, formValues);
    json = deepCopy(json, 'user_');
    return json;
}
