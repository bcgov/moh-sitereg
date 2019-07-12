import { mapAdministeringForDef } from '../../../common/update-json-map';

export function getEditJsonOfOrganization(formValues) {
    // generate signing-authorityistrator-remove object
    // #suiteno is missing
    const json: any = {};
    json.org_name = formValues.organizationName ? formValues.organizationName : '';
    // suite no not in schema
    // json.suite = formValues.suite ? formValues.suite : '';
    // street no not in schema
    // json.street = formValues.street ? formValues.street : '';
    // is street_address is street name
    json.street_address = formValues.streetName ? formValues.streetName : '';
    json.address_2 = formValues.addressLine2 ? formValues.addressLine2 : '';
    json.city = formValues.city ? formValues.city : '';
    json.province = formValues.province ? formValues.province : '';
    json.postalCode = formValues.postalCode ? formValues.postalCode : '';
    json.org_spg = mapAdministeringForDef(formValues.administeringFor);
    return json;
}
