import * as jsonUserMaps from '../../../common/update-json-user-map';
import { actionType, deepCopy, addDefinationProperty } from '../../../common/update-json-map';

export function getAddJsonOfMspUser(formValues) {
    let json = jsonUserMaps.mapJsonCoreUser(actionType.Add, formValues);

    delete json.confirm_email;

    json.msp_access = 'Y';
    json = deepCopy(json, 'user_');

    /**
     * users_def
     * users_added : array
     */

    json = addDefinationProperty(json, 'user_def');
    const jsonDef: any = { users_added: {} };
    jsonDef.users_added = json;
    return jsonDef;
}

export function getEditJsonOfMspUser(formValues) {
    let json = jsonUserMaps.mapJsonCoreUser(actionType.Edit, formValues);
    
    json.user = addDefinationProperty(json.user, 'person_id_def');
    json = deepCopy(json, 'user_');

    json = addDefinationProperty(json, 'user_update_def');

    const jsonDef: any = { users_updated: {} };
    jsonDef.users_updated = json;
    return jsonDef;
}

export function getRemoveJsonOfMspUser(formValues) {
    let json = jsonUserMaps.mapJsonCoreUser(actionType.Remove, formValues);

    /**
     * access_administrator_person_id_def : object default []
     * access_administrator_removed : array
     */
    json = addDefinationProperty(json, 'person_id_def');
    // json = deepCopy(json, 'user_');
    const jsonDef: any = { users_removed: {} };
    jsonDef.users_removed = json;
    return jsonDef;
}
