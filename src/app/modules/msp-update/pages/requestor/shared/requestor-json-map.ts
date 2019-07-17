import { funcRandomNumber8Digit, getDateinMMDDYYYY } from '../../../common/update-json-map';
import { IRequestor, getIRequestor } from './i-requestor';
import * as jsonInterfaces from '../../submit/json-payload';

export function getJsonOfRequestor(formValues, requestUUID?: string) {

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
    json.request_uuid = requestUUID ? requestUUID : this.globalConfigSvc.applicationId;
    json.request_num = funcRandomNumber8Digit();

    const dated = new Date();

    // optional
    json.authorizedBySA = 'Y';
    json.authorizedDate = getDateinMMDDYYYY(dated);
    json.applicationType = 'mspdUpdate';

    return json;
}


export function getJSONofRequestor(formValue, requestUUID?: string) {

    // SiteregMaintenance: object
    /**
     * authorizedBySA - this is not required in maintenance forms
     * authorizedDate - seems Pattern changed
     * applicationType - mspdUpdate
     */

    if (!formValue) return;
    const formValues = getIRequestor(formValue);

    // console.log(formValues);

    const dated = new Date();

    const json: jsonInterfaces.ji_requestor_def = {
        org_num: formValues.organizationNumber ? formValues.organizationNumber : '',
        org_email: formValues.emailAddress ? formValues.emailAddress : '',
        request_uuid: requestUUID ? requestUUID : this.globalConfigSvc.applicationId,
        request_num: funcRandomNumber8Digit(),
        authorizedBySA: 'Y',
        authorizedDate : getDateinMMDDYYYY(dated),
        applicationType : 'mspdUpdate',
    };

    return json;
}

