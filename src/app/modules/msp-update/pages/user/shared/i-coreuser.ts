import { isValidOptionalField } from '../../../common/update-json-map';

export interface ICoreUser {
    userTitle?;
    firstName?;
    initial?;
    lastName?;
    jobTitle?;
    emailAddress?;
    confirmEmail?;
    phone?;
    ext?;
    fax?;

    // Add
    administeringFor?;

    // Edit
    changeAdministerFor?;
    changeRole?;

    // Remove
    forIdentifyEmailAddress?;
    forIdentifyMinistryUserId?;

}

export function getICoreUser(formValues): ICoreUser {
    if (!formValues) return;

    const iObj: ICoreUser = {};

    if (isValidOptionalField(formValues.userTitle)) iObj.userTitle = formValues.userTitle;
    if (isValidOptionalField(formValues.firstName)) iObj.firstName = formValues.firstName;
    if (isValidOptionalField(formValues.initial)) iObj.initial = formValues.initial;
    if (isValidOptionalField(formValues.lastName)) iObj.lastName = formValues.lastName;
    if (isValidOptionalField(formValues.jobTitle)) iObj.jobTitle = formValues.jobTitle;
    if (isValidOptionalField(formValues.emailAddress)) iObj.emailAddress = formValues.emailAddress;
    if (isValidOptionalField(formValues.confirmEmail)) iObj.confirmEmail = formValues.confirmEmail;
    if (isValidOptionalField(formValues.phone)) iObj.phone = formValues.phone;
    if (isValidOptionalField(formValues.ext)) iObj.ext = formValues.ext;
    if (isValidOptionalField(formValues.fax)) iObj.fax = formValues.fax;
    if (isValidOptionalField(formValues.administeringFor)) iObj.administeringFor = formValues.administeringFor;
    if (isValidOptionalField(formValues.changeAdministerFor)) iObj.changeAdministerFor = formValues.changeAdministerFor;
    if (isValidOptionalField(formValues.forIdentifyEmailAddress)) iObj.forIdentifyEmailAddress = formValues.forIdentifyEmailAddress;
    if (isValidOptionalField(formValues.forIdentifyMinistryUserId)) iObj.forIdentifyMinistryUserId = formValues.forIdentifyMinistryUserId;
    return iObj;
}


export function getICoreUserReviewItems(infoObject: ICoreUser) {
    const items = [
        { label: 'User Title', value: infoObject.userTitle },
        { label: 'First Name', value: infoObject.firstName },
        { label: 'Initial', value: infoObject.initial },
        { label: 'Last Name', value: infoObject.lastName },
        { label: 'Job Title', value: infoObject.jobTitle },
        { label: 'Email:', value: infoObject.emailAddress },
        { label: 'Phone:', value: infoObject.phone },
        { label: 'Ext:', value: infoObject.ext },
        { label: 'Fax:', value: infoObject.fax },
        { label: 'Administering for:', value: infoObject.administeringFor },
        { label: 'Change role to:', value: infoObject.changeRole },
    ];
    return items;
}
