import {
    mapAdministeringForDef,
    isValidOptionalField,
    trimText,
} from '../../../common/update-json-map';
import { getIOrganizationEdit } from './i-organization';
import * as jsonInterfaces from '../../submit/json-payload';

export function getEditJsonOfOrganization(formValues) {
    // org_maintenance_def: object

    const json: any = {};

    // required
    json.org_name = formValues.organizationName
        ? formValues.organizationName
        : '';
    json.street_address = formValues.streetName ? formValues.streetName : '';
    json.city = formValues.city ? formValues.city : '';
    json.province = formValues.province ? formValues.province : '';
    json.postalCode = formValues.postalCode ? formValues.postalCode : '';
    json.org_spg = mapAdministeringForDef(formValues.administeringFor);

    // optional
    if (isValidOptionalField(formValues.addressLine2)) {
        json.address_2 = formValues.addressLine2;
    }

    return json;
}

export function getEditJSONofOrganization(formValue) {
    if (!formValue) return;
    const formValues = getIOrganizationEdit(formValue);
    const json: jsonInterfaces.ji_org_maintenance_def = {};

    if (isValidOptionalField(formValues.organizationName)) {
        json.org_name = formValues.organizationName;
    }

    // in stabilization organization
    // all address fields should be enforced if any value provided
    // optional fields

    let suite = null;
    let street = null;
    let streetName = null;
    if (isValidOptionalField(formValues.suite)) {
        suite = trimText(formValues.suite);
    }
    if (isValidOptionalField(formValues.street)) {
        street = trimText(formValues.street);
    }
    if (isValidOptionalField(formValues.streetName)) {
        streetName = trimText(formValues.streetName);
    }

    if (suite || street || streetName) {
        json.street_address = `${suite ? suite + ' ' : ''}${
            street ? street + ' ' : ''
        } ${streetName ? streetName : ''}`;
    }

    if (isValidOptionalField(formValues.city)) {
        json.city = formValues.city;
    }
    if (isValidOptionalField(formValues.province)) {
        json.province = formValues.province;
    }
    if (isValidOptionalField(formValues.postalCode)) {
        json.postal_code = formValues.postalCode.replace(' ', '');
    }
    if (isValidOptionalField(formValues.administeringFor)) {
        json.org_spg = mapAdministeringForDef(formValues.administeringFor);
    }
    if (isValidOptionalField(formValues.addressLine2)) {
        json.address_2 = formValues.addressLine2;
    }

    return json;
}
