import { mapAdministeringForDef, isValidOptionalField } from '../../../common/update-json-map';


export function getEditJsonOfOrganization(formValues) {

    // org_maintenance_def: object

    // #suiteno is missing
    const json: any = {};

    // required
    json.org_name = formValues.organizationName ? formValues.organizationName : '';
    // suite no not in schema
    // json.suite = formValues.suite ? formValues.suite : '';
    // street no not in schema
    // json.street = formValues.street ? formValues.street : '';
    // is street_address is street name

    json.street_address = formValues.streetName ? formValues.streetName : '';
    json.city = formValues.city ? formValues.city : '';
    json.province = formValues.province ? formValues.province : '';
    json.postalCode = formValues.postalCode ? formValues.postalCode : '';
    json.org_spg = mapAdministeringForDef(formValues.administeringFor);

    // optional
    if (isValidOptionalField(formValues.addressLine2)) json.address_2 = formValues.addressLine2;

    return json;
}
