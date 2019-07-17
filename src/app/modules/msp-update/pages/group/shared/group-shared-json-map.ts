import * as jsonMaps from '../../../common/update-json-map';
import * as jsonInterfaces from '../../submit/json-payload';
import { getIGroup } from './i-group';

export function getAddJsonOfMspGroup(formValues) {

    if (!formValues) return;

    let json: any = {};
    json.mspgroup_num = formValues && formValues.groupNo ? formValues.groupNo : '';
    if (jsonMaps.isValidOptionalField(formValues.thirdPartyAdmin)) json.third_party = formValues.thirdPartyAdmin;
    json = jsonMaps.addDefinationProperty(json, 'msp_group_def');
    return json;
}
export function getAddJSONofMspGroup(formValue) {

    if (!formValue) return;
    const formValuesArray = getIGroup(formValue);

    const jsonArray: jsonInterfaces.ji_msp_group_def[] = [];
    formValuesArray.forEach(formValues => {
        const json: jsonInterfaces.ji_msp_group_def = {
            mspgroup_num: formValues.groupNo ? formValues.groupNo : '',
            third_party: formValues.thirdPartyAdmin ? formValues.thirdPartyAdmin  : 'N',
        };
        jsonArray.push(json);
    });

    return jsonArray;
}


export function getEditJsonOfMspGroup(formValues) {
    if (!formValues) return;

    let json: any = {};
    json.mspgroup_num = formValues && formValues.groupNo ? formValues.groupNo : '';
    json.third_party = formValues && formValues.thirdPartyAdmin ? formValues.thirdPartyAdmin : '';
    json = jsonMaps.addDefinationProperty(json, 'msp_group_update_def');
    return json;
}

export function getEditJSONofMspGroup(formValue) {
    if (!formValue) return;
    const formValuesArray = getIGroup(formValue);

    const jsonArray: jsonInterfaces.ji_msp_group_update_def[] = [];
    formValuesArray.forEach(formValues => {
        const json: jsonInterfaces.ji_msp_group_update_def = {
            mspgroup_num: formValues.groupNo ? formValues.groupNo : '',
            third_party: formValues.thirdPartyAdmin ? formValues.thirdPartyAdmin  : 'N',
        };
        jsonArray.push(json);
    });

    return jsonArray;
}


export function getRemoveJsonOfMspGroup(formValues) {
    if (!formValues) return;

    let json: any = {};
    json.mspgroup_num = formValues && formValues.groupNo ? formValues.groupNo : '';
    json = jsonMaps.addDefinationProperty(json, 'msp_group_def');
    return json;
}


export function getRemoveJSONofMspGroup(formValue) {
    if (!formValue) return;
    const formValuesArray = getIGroup(formValue);

    const jsonArray: any[] = [];
    formValuesArray.forEach(formValues => {
        const json = {
            mspgroup_num: formValues.groupNo ? formValues.groupNo : ''
        };
        jsonArray.push(json);
    });

    return jsonArray;
}
