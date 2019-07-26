import { FormGroup } from '@angular/forms';
import { funcRandomNumber8Digit } from './update-json-map';


export interface IDataForm {
    patchValue(FormGroup);
}

interface IUser {
    userTitle?;
    firstName?;
    initial?;
    lastName?;
    jobTitle?;
    formGroupEmail?: {
        emailAddress?;
        confirmEmail?;
    }

    emailAddress?;
    confirmEmail?;

    phone?;
    ext?;
    fax?;
    administeringFor;
    changeAdministerFor?;
    changeRole?;
    forIdentifyEmailAddress?;
    forIdentifyMinistryUserId?;

    ministryUserId?;
    isAdmin?;
}

interface IUserRemove {
    emailAddress?;
    ministryUserId?;
}

interface IGroup {
    groupNo?;
    thirdPartyAdmin?;
}

interface IOrg {
    organizationName?;
    suite?;
    street?;
    streetName?;
    addressLine2?;
    city?;
    province?;
    postalCode?;
    administeringFor?;
}


interface IRequestor {
    organizationNumber?;
    emailAddress?;
}

export class RandomObjects {


    public static getRequestor(prefix) {
        const obj: IRequestor = {
            organizationNumber: funcRandomNumber8Digit(),
            emailAddress: prefix + 'orgrepresentative@organization.com'
        };
        return obj;
    }

    public static getOrganization(prefix) {
        const obj: IOrg = {
            organizationName: prefix + 'Ministry of Health',
            suite: prefix + '162',
            street: prefix + '977',
            streetName: prefix + 'Douglas Street',
            addressLine2: prefix + 'Opposite to convention Center',
            city: 'Victoria',
            province: 'BC',
            postalCode: 'V3K6A9',
            administeringFor: 'Employees'
        };
        return obj;
    }

    public static getRemoveUser(prefix) {
        const obj: IUserRemove = {
            emailAddress: prefix + 'useremail@users.com',
            ministryUserId: '1234567890'
        };
        return obj;
    }

    public static getUser(prefix) {
        const obj: IUser = {
            userTitle: 'Mr.',
            firstName: prefix + 'FirstName',
            initial: 'I',
            lastName: prefix + 'LastName',
            jobTitle: prefix + 'JobTitle',
            formGroupEmail: {
                emailAddress: prefix + 'user@users.com',
                confirmEmail: prefix + 'user@users.com',
            },
            phone: '1000000000',
            ext: '333',
            fax: '1000000000',
            administeringFor: 'Employees',

            changeAdministerFor: true,
            changeRole: 'No Change',
            forIdentifyEmailAddress: prefix + 'identify@users.com',
            forIdentifyMinistryUserId: funcRandomNumber8Digit(),

            ministryUserId: prefix + funcRandomNumber8Digit(),
            isAdmin: true
        };
        return obj;
    }

    public static getUser02(prefix) {
        const obj: IUser = {
            userTitle: 'Mr.',
            firstName: prefix + 'FirstName',
            initial: 'I',
            lastName: prefix + 'LastName',
            jobTitle: prefix + 'JobTitle',
            formGroupEmail : {
                emailAddress: prefix + 'user@users.com',
                confirmEmail: prefix + 'user@users.com',
            },
            phone: '1000000000',
            ext: '333',
            fax: '1000000000',
            administeringFor: 'Employees',

            changeAdministerFor: true,
            changeRole: 'No Change',
            forIdentifyEmailAddress: prefix + 'identify@users.com',
            forIdentifyMinistryUserId: prefix + funcRandomNumber8Digit(),

            ministryUserId: funcRandomNumber8Digit(),
            isAdmin: true
        };
        return obj;
    }

    public static getGroup(prefix) {
        const obj: IGroup = {
            groupNo: prefix + '000000',
            thirdPartyAdmin: 'Y'
        };
        return obj;
    }

}

// patchValue(formGroup) {
//     formGroup.patchValue({
//         userTitle: 'Mr.' ?,
//         firstName: 'Access' ?,
//         initial: 'A' ?,
//         lastName: 'Admin' ?,
//         jobTitle: 'Access Administrator' ?,
//         emailAddress: 'aa@aa.com' ?,
//         confirmEmail: 'aa@aa.com' ?,
//         phone: '1234567890' ?,
//         ext: '123' ?,
//         fax: '1112223330' ?,
//         administeringFor: 'E' ?,
//     });
// }