import { Validators } from '@angular/forms';
import {
    trailingSpacesValidator,
    phoneValidator,
    faxValidator,
} from '../../../common/update-validators';

//#region User

export const cUpdateUserSharedValidator = {
    userTitle: [Validators.maxLength(5), trailingSpacesValidator()],
    firstName: [
        Validators.minLength(1),
        Validators.maxLength(100),
        trailingSpacesValidator(),
    ],
    initial: [Validators.maxLength(1), trailingSpacesValidator()],
    lastName: [
        Validators.minLength(1),
        Validators.maxLength(100),
        trailingSpacesValidator(),
    ],
    jobTitle: [
        Validators.minLength(1),
        Validators.maxLength(100),
        trailingSpacesValidator(),
    ],
    emailAddress: [
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.pattern(/^(\S+)@(\S+)\.(\S+)$/),
    ],
    confirmEmail: [
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.pattern(/^(\S+)@(\S+)\.(\S+)$/),
    ],
    phone: [phoneValidator(), trailingSpacesValidator()],
    ext: [Validators.maxLength(100), trailingSpacesValidator()],
    fax: [faxValidator()],
    administeringFor: [Validators.maxLength(100)],
    ministryUserId: [Validators.maxLength(20), trailingSpacesValidator()],
};

export const cUpdateUserValidator = {
    add: {
        userTitle: [...cUpdateUserSharedValidator.userTitle],
        firstName: [
            Validators.required,
            ...cUpdateUserSharedValidator.firstName,
        ],
        initial: [...cUpdateUserSharedValidator.initial],
        lastName: [Validators.required, ...cUpdateUserSharedValidator.lastName],
        jobTitle: [Validators.required, ...cUpdateUserSharedValidator.jobTitle],
        emailAddress: [
            Validators.required,
            ...cUpdateUserSharedValidator.emailAddress,
        ],
        confirmEmail: [
            Validators.required,
            ...cUpdateUserSharedValidator.confirmEmail,
        ],
        phone: [Validators.required, ...cUpdateUserSharedValidator.phone],
        ext: [...cUpdateUserSharedValidator.ext],
        fax: [...cUpdateUserSharedValidator.fax],
        administeringFor: [
            Validators.required,
            ...cUpdateUserSharedValidator.administeringFor,
        ],
    },
    remove: {
        emailAddress: [
            Validators.required,
            ...cUpdateUserSharedValidator.emailAddress,
        ],
        ministryUserId: [...cUpdateUserSharedValidator.ministryUserId],
    },
    edit: {
        userTitle: [...cUpdateUserSharedValidator.userTitle],
        firstName: [...cUpdateUserSharedValidator.firstName],
        initial: [...cUpdateUserSharedValidator.initial],
        lastName: [...cUpdateUserSharedValidator.lastName],
        jobTitle: [...cUpdateUserSharedValidator.jobTitle],
        emailAddress: [...cUpdateUserSharedValidator.emailAddress],
        confirmEmail: [...cUpdateUserSharedValidator.confirmEmail],
        phone: [...cUpdateUserSharedValidator.phone],
        ext: [...cUpdateUserSharedValidator.ext],
        fax: [...cUpdateUserSharedValidator.fax],

        changeRole: [Validators.required],

        changeAdministeringFor: [Validators.required],
        administeringFor: [...cUpdateUserSharedValidator.administeringFor],

        forIdentifyEmailAddress: [
            Validators.required,
            ...cUpdateUserSharedValidator.emailAddress,
        ],
        forIdentifyMinistryUserId: [
            ...cUpdateUserSharedValidator.ministryUserId,
        ],
    },
};

//#endregion

//#region Enumerations

export const cUpdateUserEnumeration = {
    userTitles: ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', 'Rev.'],
    administeringFor: {
        add: [
            'Employees',
            'International Students',
            'Employees and International Students',
        ],
        edit: [
            'Employees',
            'International Students',
            'Employees and International Students',
        ],
    },
    changeRole: ['No Change', 'Access Administrator', 'Signing Authority'],
};

//#endregion
