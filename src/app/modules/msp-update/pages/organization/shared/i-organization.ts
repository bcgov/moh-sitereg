import { isValidOptionalField } from '../../../common/update-json-map';

export interface IOrganizationEdit {
    organizationName?: string;
    suite?: string;
    street?: string;
    streetName?: string;
    addressLine2?: string;
    city?: string;
    province?: string;
    postalCode?: string;
    administeringFor?: string;
}

export function getIOrganizationEdit(formValues): IOrganizationEdit {
    if (!formValues) return;

    const iObj: IOrganizationEdit = {};

    if (isValidOptionalField(formValues.organizationName)) iObj.organizationName = formValues.organizationName;
    if (isValidOptionalField(formValues.suite)) iObj.suite = formValues.suite;
    if (isValidOptionalField(formValues.street)) iObj.street = formValues.street;
    if (isValidOptionalField(formValues.streetName)) iObj.streetName = formValues.streetName;
    if (isValidOptionalField(formValues.addressLine2)) iObj.addressLine2 = formValues.addressLine2;
    if (isValidOptionalField(formValues.city)) iObj.city = formValues.city;
    if (isValidOptionalField(formValues.province)) iObj.province = formValues.province;
    if (isValidOptionalField(formValues.postalCode)) iObj.postalCode = formValues.postalCode;
    if (isValidOptionalField(formValues.administeringFor)) iObj.administeringFor = formValues.administeringFor;

    return iObj;
}
