import * as jsonUserMaps from '../../../common/update-json-user-map';
import { actionType, deepCopy, addDefinationProperty } from '../../../common/update-json-map';


export function getAddJsonOfAccessAdministrator(formValues) {

    let json = jsonUserMaps.mapJsonCoreUser(actionType.Add, formValues);

    delete json.confirm_email;

    json.msp_access = 'Y';
    json = deepCopy(json, 'aa_');

    /**
     * access_administrator_def
     * access_administrator_added : array
     */

    json = addDefinationProperty(json, 'access_administrator_def');
    const jsonDef: any = { access_administrator_added: {} };
    jsonDef.access_administrator_added = json;
    return jsonDef;
}

export function getEditJsonOfAccessAdministrator(formValues) {

    let json = jsonUserMaps.mapJsonCoreUser(actionType.Edit, formValues);
    
    /**
     * access_administrator_update_def : object default []
     * access_administrator_updated : array
     */

    json.user = addDefinationProperty(json.user, 'person_id_def');
    json = deepCopy(json, 'aa_');

    json = addDefinationProperty(json, 'access_administrator_update_def');
    const jsonDef: any = { access_administrator_updated: {} };
    jsonDef.access_administrator_updated = json;
    return jsonDef;
}

export function getRemoveJsonOfAccessAdministrator(formValues) {
    
    let json = jsonUserMaps.mapJsonCoreUser(actionType.Remove, formValues);

    /**
     * person_id_def : object default []
     * access_administrator_removed : array
     */
    json = addDefinationProperty(json, 'person_id_def');
    // json = deepCopy(json, 'aa_');
    const jsonDef: any = { access_administrator_removed: {} };
    jsonDef.access_administrator_removed = json;
    return jsonDef;
}
