//#region General

export function addDefinationProperty(json, definationName: string) {
    json.__defination = definationName;
    return json;
}

export function getDateinMMDDYYYY(date: Date) {
    let mm: string;
    let dd: string;
    let yyyy: string;

    let dateString: string;

    dd = date.getDate().toString();
    mm = (date.getMonth() + 1).toString();
    yyyy = date.getFullYear().toString();

    dateString =
        `${mm.length > 1 ? mm : '0' + mm}` +
        `-${dd.length > 1 ? dd : '0' + dd}` +
        `-${yyyy}`;

    return dateString;
}

export function funcRandomNumber8Digit() {
    return Math.floor(Math.random() * 89999999 + 10000000).toString();
}

export function trimText(sourceText: any) {
    let trimmedText: any;

    // cautionary this must have value.
    trimmedText = sourceText;
    try {
        if (sourceText) {
            if (typeof sourceText === 'string' && sourceText.length > 0) {
                trimmedText = sourceText.trim();
            }

            if (typeof sourceText === 'object') {
                trimmedText = trimObjectAllProperties(sourceText);
            }
        }
    } catch (e) {
        console.log(e);
        trimmedText = sourceText;
    }

    return trimmedText;
}

export function trimObjectAllProperties(jsonObject: any) {
    const properties = Object.keys(jsonObject);
    for (const prop of properties) {
        // console.log(`%o: %o`, prop, jsonObject[prop]);
        jsonObject[prop] = trimText(jsonObject[prop]);
    }
    return jsonObject;
}
/**
 * verifies if field value is not null and not empty string or valid boolean
 * @param fieldValue FieldValue
 */
export function isValidOptionalField(
    fieldValue: string | boolean | any
): boolean {
    if (fieldValue) {
        if (typeof fieldValue === 'string' && fieldValue.length > 0) {
            return true;
        }

        if (
            typeof fieldValue === 'boolean' &&
            (fieldValue === true || fieldValue === false)
        ) {
            return true;
        }

        if (typeof fieldValue === 'object') {
            const isArray = fieldValue instanceof Array;
            if (isArray === true && fieldValue.length > 0) {
                return true;
            }
            if (isArray === false) {
                // if (fieldValue) return true;
                // console.log(fieldValue);
                if (fieldValue) return true;
            }

            return false;
        }
    }
    return false;
}

//#endregion

//#region IAM-Mapping

export function deepCopy(obj: any, prefixProperty: string = ''): any {
    const newObject = {};
    Object.keys(obj).forEach((k) => {
        const newPropertyName = `${prefixProperty}${k}`;
        newObject[newPropertyName] = obj[k];
    });
    return newObject;
}

export function mapYesNoDef(val: boolean): string {
    if (val) return 'Y';
    return 'N';
}

/**
 * Maps Administring for selected value to middleware defination ^[EIB]$
 * @param val string Parameter
 */

export function mapAdministeringForDef(val: string): string {
    let result = '';
    switch (val) {
        case 'No Change': {
            result = 'N';
            break;
        }
        case 'Employees': {
            result = 'E';
            break;
        }
        case 'International Students': {
            result = 'I';
            break;
        }
        case 'Employees and International Students': {
            result = 'B';
            break;
        }
    }
    return result;
}

/**
 * Maps Administring for selected value to middleware defination ^[EIB]$
 * @param val string Parameter
 */

export function mapChangeRoleDef(val: string): string {
    let result = '';
    switch (val) {
        case 'No Change': {
            result = 'N';
            break;
        }
        case 'User': {
            result = 'U';
            break;
        }
        case 'Access Administrator': {
            result = 'A';
            break;
        }
        case 'Signing Authority': {
            result = 'S';
            break;
        }
    }
    return result;
}

export const enum actionType {
    Add,
    Remove,
    Edit,
}

// export function mapJsonUser(userAction: actionType, formValues) {
//     if (!formValues) return;

//     const json: any = {};

//     if (userAction === actionType.Add) {
//         // console.log('mapJson - ' + userAction);

//         json.firstName = formValues.firstName ? formValues.firstName : '';
//         json.lastName = formValues.lastName ? formValues.lastName : '';
//         json.jobTitle = formValues.jobTitle ? formValues.jobTitle : '';
//         json.emailAddress = formValues.emailAddress ? formValues.emailAddress : '';
//         json.confirmEmail = formValues.confirmEmail ? formValues.confirmEmail : '';
//         json.phone = formValues.phone ? formValues.phone : ''; 3
//         json.spg = mapAdministeringForDef(formValues.administeringFor);

//         // Optional
//         if (isValidOptionalField(formValues.userTitle)) json.curtesy_title = formValues.userTitle;
//         if (isValidOptionalField(formValues.initial)) json.initial = formValues.initial;
//         if (isValidOptionalField(formValues.ext)) json.ext = formValues.ext;
//         if (isValidOptionalField(formValues.fax)) json.fax = formValues.fax;
//     }

//     if (userAction === actionType.Edit) {
//         // console.log('mapJson - ' + userAction);

//         json.email = formValues && formValues.forIdentifyEmailAddress ? formValues.forIdentifyEmailAddress : '';
//         if (isValidOptionalField(formValues.forIdentifyMinistryUserId)) json.id = formValues.forIdentifyMinistryUserId;

//         json.change_role = mapChangeRoleDef(formValues.changeRole);
//         // console.log('formValues.changeRole ' + formValues.changeRole);
//         json.msp_access = formValues.changeAdministerFor && formValues.changeAdministerFor === true ? 'Y' : 'N';
//         json.spg = mapAdministeringForDef(formValues.administeringFor);

//         // Optional - in Add
//         if (isValidOptionalField(formValues.userTitle)) json.curtesy_title = formValues.userTitle;
//         if (isValidOptionalField(formValues.initial)) json.initial = formValues.initial;
//         if (isValidOptionalField(formValues.ext)) json.ext = formValues.ext;
//         if (isValidOptionalField(formValues.fax)) json.fax = formValues.fax;

//         // Optional - in Edit
//         if (isValidOptionalField(formValues.firstName)) json.curtesy_title = formValues.firstName;
//         if (isValidOptionalField(formValues.lastName)) json.initial = formValues.lastName;
//         if (isValidOptionalField(formValues.jobTitle)) json.ext = formValues.jobTitle;
//         if (isValidOptionalField(formValues.emailAddress)) json.fax = formValues.emailAddress;
//         if (isValidOptionalField(formValues.confirmEmail)) json.fax = formValues.confirmEmail;
//         if (isValidOptionalField(formValues.phone)) json.fax = formValues.phone;
//     }

//     if (userAction === actionType.Remove) {
//         // console.log('mapJson - ' + userAction);
//         json.email = formValues && formValues.emailAddress ? formValues.emailAddress : '';
//         if (isValidOptionalField(formValues.ministryUserId)) json.id = formValues.ministryUserId;
//     }

//     return json;
// }

// //#endregion
