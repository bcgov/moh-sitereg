import { isValidOptionalField } from './update-json-map';

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
    forIdentifyEmailAddress?;
    forIdentifyMinistryUserId?;

    // update
    ministryUserId?;

}

export function getICoreUser(formValues): ICoreUser[] {
    if (!formValues) return;

    const iObjArray: ICoreUser[] = [];

    formValues.arrayOfForms.forEach(form => {
        const iObj: ICoreUser = {};
        if (isValidOptionalField(form.userTitle)) iObj.userTitle = form.userTitle;
        if (isValidOptionalField(form.firstName)) iObj.firstName = form.firstName;
        if (isValidOptionalField(form.initial)) iObj.initial = form.initial;
        if (isValidOptionalField(form.lastName)) iObj.lastName = form.lastName;
        if (isValidOptionalField(form.jobTitle)) iObj.jobTitle = form.jobTitle;
        if (isValidOptionalField(form.emailAddress)) iObj.emailAddress = form.emailAddress;
        if (isValidOptionalField(form.confirmEmail)) iObj.confirmEmail = form.confirmEmail;
        if (isValidOptionalField(form.phone)) iObj.phone = form.phone;
        if (isValidOptionalField(form.ext)) iObj.ext = form.ext;
        if (isValidOptionalField(form.fax)) iObj.fax = form.fax;
        if (isValidOptionalField(form.administeringFor)) iObj.administeringFor = form.administeringFor;
        if (isValidOptionalField(form.changeAdministerFor)) iObj.changeAdministerFor = form.changeAdministerFor;
        if (isValidOptionalField(form.forIdentifyEmailAddress)) iObj.forIdentifyEmailAddress = form.forIdentifyEmailAddress;
        if (isValidOptionalField(form.forIdentifyMinistryUserId)) iObj.forIdentifyMinistryUserId = form.forIdentifyMinistryUserId;
        if (isValidOptionalField(form.ministryUserId)) iObj.ministryUserId = form.ministryUserId;
        
        iObjArray.push(iObj);
        console.log(iObj);
    });

    console.log(iObjArray);
    return iObjArray;
}


export function getICoreUserReviewItems(infoObjects: ICoreUser[]) {

    const items = [];

    infoObjects.forEach(element => {
        const item = [];
        if (isValidOptionalField(element.userTitle)) item.push({ label: 'User Title', value: element.userTitle });
        if (isValidOptionalField(element.firstName)) item.push({ label: 'First Name', value: element.firstName });
        if (isValidOptionalField(element.initial)) item.push({ label: 'Initial', value: element.initial });
        if (isValidOptionalField(element.lastName)) item.push({ label: 'Last Name', value: element.lastName });
        if (isValidOptionalField(element.jobTitle)) item.push({ label: 'Job Title', value: element.jobTitle });
        if (isValidOptionalField(element.emailAddress)) item.push({ label: 'Email Address', value: element.emailAddress });
        if (isValidOptionalField(element.confirmEmail)) item.push({ label: 'Confirm Email', value: element.confirmEmail });
        if (isValidOptionalField(element.phone)) item.push({ label: 'Phone', value: element.phone });
        if (isValidOptionalField(element.ext)) item.push({ label: 'Extension', value: element.ext });
        if (isValidOptionalField(element.fax)) item.push({ label: 'Fax', value: element.fax });
        if (isValidOptionalField(element.administeringFor)) item.push({ label: 'Administering For', value: element.administeringFor });
        if (isValidOptionalField(element.changeAdministerFor)) item.push({ label: 'Change Administering For', value: element.changeAdministerFor });
        if (isValidOptionalField(element.forIdentifyEmailAddress)) item.push({ label: 'Identifiy Email', value: element.forIdentifyEmailAddress });
        if (isValidOptionalField(element.forIdentifyMinistryUserId)) item.push({ label: 'Identify Ministry Id', value: element.forIdentifyMinistryUserId });
        if (isValidOptionalField(element.ministryUserId)) item.push({ label: 'Ministry Id', value: element.ministryUserId });
        items.push(item);
    });
    return items;
}
