import * as jsonUserMaps from '../../../common/update-json-user-map';
import {
    actionType,
    deepCopy,
    addDefinationProperty,
} from '../../../common/update-json-map';
import * as jsonInterfaces from '../../submit/json-payload';
import { getIUser } from './i-user';

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

export function getAddJSONofMspUser(formValue) {
    if (!formValue) return;

    // console.log(`getAddJSONofMspUser %o`, formValue);
    const formValuesArray = getIUser(formValue);

    // console.log(`formValuesArray %o`, formValuesArray);
    const jsonArray: any[] = [];
    formValuesArray.forEach((formValues) => {
        // console.log(`form Value Array %o`, formValues);
        let json = jsonUserMaps.mapJsonCoreUser(actionType.Add, formValues);
        delete json.confirm_email;

        // json.msp_access = 'Y';
        delete json.msp_access; // because schema don`t want this field.
        json = deepCopy(json, 'user_');

        jsonArray.push(json);
    });

    return jsonArray;
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

export function getEditJSONofMspUser(formValue) {
    if (!formValue) return;
    // console.log(formValue);
    const formValuesArray = getIUser(formValue);
    // console.log(formValuesArray);
    const jsonArray: any[] = [];
    formValuesArray.forEach((formValues) => {
        // console.log(formValues);
        let json = jsonUserMaps.mapJsonCoreUser(actionType.Edit, formValues);
        // delete json.confirm_email;
        json = deepCopy(json, 'user_');
        // console.log(json);

        jsonArray.push(json);
    });

    return jsonArray;
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

export function getRemoveJSONofMspUser(formValue) {
    if (!formValue) return;
    const formValuesArray = getIUser(formValue);
    const jsonArray: any[] = [];
    formValuesArray.forEach((formValues) => {
        const json = jsonUserMaps.mapJsonCoreUser(
            actionType.Remove,
            formValues
        );

        jsonArray.push(json);
    });

    return jsonArray;
}
