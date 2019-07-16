import * as jsonMaps from '../../../common/update-json-map';

export function getAddJsonOfMspGroup(formValues) {

    if (!formValues) return;

    let json: any = {};
    json.mspgroup_num = formValues && formValues.groupNo ? formValues.groupNo : '';
    if (jsonMaps.isValidOptionalField(formValues.thirdPartyAdmin)) json.third_party = formValues.thirdPartyAdmin;
    json = jsonMaps.addDefinationProperty(json, 'msp_group_def');
    return json;
}

export function getEditJsonOfMspGroup(formValues) {
    if (!formValues) return;

    let json: any = {};
    json.mspgroup_num = formValues && formValues.groupNo ? formValues.groupNo : '';
    json.third_party = formValues && formValues.thirdPartyAdmin ? formValues.thirdPartyAdmin : '';
    json = jsonMaps.addDefinationProperty(json, 'msp_group_update_def');
    return json;
}

export function getRemoveJsonOfMspGroup(formValues) {
    if (!formValues) return;

    let json: any = {};
    json.mspgroup_num = formValues && formValues.groupNo ? formValues.groupNo : '';
    json = jsonMaps.addDefinationProperty(json, 'msp_group_def');
    return json;
}
