import { Validators } from '@angular/forms';
import {
    trailingSpacesValidator,
    phoneValidator,
    faxValidator,
} from '../../../common/update-validators';

//#region User

export const cUpdateAccessAdminSharedValidator = {
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

export const cUpdateAccessAdminValidator = {
    add: {
        userTitle: [...cUpdateAccessAdminSharedValidator.userTitle],
        firstName: [
            Validators.required,
            ...cUpdateAccessAdminSharedValidator.firstName,
        ],
        initial: [...cUpdateAccessAdminSharedValidator.initial],
        lastName: [
            Validators.required,
            ...cUpdateAccessAdminSharedValidator.lastName,
        ],
        jobTitle: [
            Validators.required,
            ...cUpdateAccessAdminSharedValidator.jobTitle,
        ],
        emailAddress: [
            Validators.required,
            ...cUpdateAccessAdminSharedValidator.emailAddress,
        ],
        confirmEmail: [
            Validators.required,
            ...cUpdateAccessAdminSharedValidator.confirmEmail,
        ],
        phone: [
            Validators.required,
            ...cUpdateAccessAdminSharedValidator.phone,
        ],
        ext: [...cUpdateAccessAdminSharedValidator.ext],
        fax: [...cUpdateAccessAdminSharedValidator.fax],
        administeringFor: [
            Validators.required,
            ...cUpdateAccessAdminSharedValidator.administeringFor,
        ],
    },
    remove: {
        emailAddress: [
            Validators.required,
            ...cUpdateAccessAdminSharedValidator.emailAddress,
        ],
        ministryUserId: [...cUpdateAccessAdminSharedValidator.ministryUserId],
    },
    edit: {
        userTitle: [...cUpdateAccessAdminSharedValidator.userTitle],
        firstName: [...cUpdateAccessAdminSharedValidator.firstName],
        initial: [...cUpdateAccessAdminSharedValidator.initial],
        lastName: [...cUpdateAccessAdminSharedValidator.lastName],
        jobTitle: [...cUpdateAccessAdminSharedValidator.jobTitle],
        emailAddress: [...cUpdateAccessAdminSharedValidator.emailAddress],
        confirmEmail: [...cUpdateAccessAdminSharedValidator.confirmEmail],
        phone: [...cUpdateAccessAdminSharedValidator.phone],
        ext: [...cUpdateAccessAdminSharedValidator.ext],
        fax: [...cUpdateAccessAdminSharedValidator.fax],

        changeRole: [Validators.required],

        changeAdministeringFor: [Validators.required],
        administeringFor: [
            ...cUpdateAccessAdminSharedValidator.administeringFor,
        ],

        forIdentifyEmailAddress: [
            Validators.required,
            ...cUpdateAccessAdminSharedValidator.emailAddress,
        ],
        forIdentifyMinistryUserId: [
            ...cUpdateAccessAdminSharedValidator.ministryUserId,
        ],
    },
};

//#endregion

//#region Enumerations

export const cUpdateAccessAdminEnumeration = {
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
    changeRole: ['No Change', 'User', 'Signing Authority'],
};

//#endregion
