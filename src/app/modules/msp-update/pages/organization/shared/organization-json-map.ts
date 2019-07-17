import { mapAdministeringForDef, isValidOptionalField } from '../../../common/update-json-map';
import { getIOrganizationEdit } from './i-organization';
import * as jsonInterfaces from '../../submit/json-payload';

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



export function getEditJSONofOrganization(formValue) {

    // SiteregMaintenance: object
    /**
     * authorizedBySA - this is not required in maintenance forms
     * authorizedDate - seems Pattern changed
     * applicationType - mspdUpdate
     */

    if (!formValue) return;
    const formValues = getIOrganizationEdit(formValue);

    console.log(formValues);
    const json: jsonInterfaces.ji_org_maintenance_def = {

        org_name: formValues.organizationName ? formValues.organizationName : '',
        // suite no not in schema
        //  suite : formValues.suite ? formValues.suite : '',:
        // street no not in schema
        //  street : formValues.street ? formValues.street : '',:
        // is street_address is street name

        street_address: formValues.streetName ? formValues.streetName : '',
        city: formValues.city ? formValues.city : '',
        province: formValues.province ? formValues.province : '',
        postal_code: formValues.postalCode ? formValues.postalCode : '',
        org_spg: mapAdministeringForDef(formValues.administeringFor),

    };

    // optional
    if (isValidOptionalField(formValues.addressLine2)) json.address_2 = formValues.addressLine2;

    return json;
}