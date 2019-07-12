import { funcRandomNumber8Digit, getDateinMMDDYYYY } from '../../../common/update-json-map';

export function getJsonOfRequestor(formValues) {
    const json: any = {};
    // from form
    json.org_num = formValues && formValues.organizationNumber ? formValues.organizationNumber : '';
    json.org_email = formValues && formValues.emailAddress ? formValues.emailAddress : '';

    json.request_uuid = this.globalConfigSvc.applicationId;
    json.request_num = funcRandomNumber8Digit();
    json.authorizedBySA = 'Y';
    const dated = new Date();

    json.authorizedDate = getDateinMMDDYYYY(dated);
    json.applicationType = 'mspdUpdate';
    return json;
}

