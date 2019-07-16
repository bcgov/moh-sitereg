import { funcRandomNumber8Digit, getDateinMMDDYYYY } from '../../../common/update-json-map';

export function getJsonOfRequestor(formValues) {

    // SiteregMaintenance: object
    /**
     * authorizedBySA - this is not required in maintenance forms
     * authorizedDate - seems Pattern changed
     * applicationType - mspdUpdate
     */

    const json: any = {};

    // required
    json.org_num = formValues && formValues.organizationNumber ? formValues.organizationNumber : '';
    json.org_email = formValues && formValues.emailAddress ? formValues.emailAddress : '';
    json.request_uuid = this.globalConfigSvc.applicationId;
    json.request_num = funcRandomNumber8Digit();

    const dated = new Date();

    // optional
    json.authorizedBySA = 'Y';
    json.authorizedDate = getDateinMMDDYYYY(dated);
    json.applicationType = 'mspdUpdate';

    return json;
}

