import { Validators } from '@angular/forms';
import { trailingSpacesValidator, phoneValidator, faxValidator } from '../../../common/update-validators';

//#region User

export const cUpdateSigningAuthoritySharedValidator = {
        userTitle: [
            Validators.maxLength(5),
            trailingSpacesValidator(),
        ],
        firstName: [
            Validators.minLength(1),
            Validators.maxLength(100),
            trailingSpacesValidator(),
        ],
        initial: [
            Validators.maxLength(1),
            trailingSpacesValidator(),
        ],
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
        phone: [
            phoneValidator(),
            trailingSpacesValidator(),
        ],
        ext: [
            Validators.maxLength(100),
            trailingSpacesValidator(),
        ],
        fax: [faxValidator()],
        isAdmin: [],
        administeringFor: [Validators.maxLength(100)],
        ministryUserId: [
            Validators.maxLength(20),
            trailingSpacesValidator()]
};

export const cUpdateSigningAuthorityValidator = {
    add: {
        userTitle: [
            ...cUpdateSigningAuthoritySharedValidator.userTitle,
        ],
        firstName: [
            Validators.required,
            ...cUpdateSigningAuthoritySharedValidator.firstName,
        ],
        initial: [
            ...cUpdateSigningAuthoritySharedValidator.initial,
        ],
        lastName: [
            Validators.required,
            ...cUpdateSigningAuthoritySharedValidator.lastName,
        ],
        jobTitle: [
            Validators.required,
            ...cUpdateSigningAuthoritySharedValidator.jobTitle,
        ],
        emailAddress: [
            Validators.required,
            ...cUpdateSigningAuthoritySharedValidator.emailAddress,
        ],
        confirmEmail: [
            Validators.required,
            ...cUpdateSigningAuthoritySharedValidator.confirmEmail,
        ],
        phone: [
            Validators.required,
            ...cUpdateSigningAuthoritySharedValidator.phone,
        ],
        ext: [
            ...cUpdateSigningAuthoritySharedValidator.ext,
        ],
        fax: [
            ...cUpdateSigningAuthoritySharedValidator.fax,
        ],
        isAdmin: [
            Validators.required,
            ...cUpdateSigningAuthoritySharedValidator.isAdmin,
        ],
        administeringFor: [
            Validators.required,
            ...cUpdateSigningAuthoritySharedValidator.administeringFor,
        ],
    },
    remove: {
        emailAddress: [
            Validators.required,
            ...cUpdateSigningAuthoritySharedValidator.emailAddress,
        ],
        ministryUserId: [
            ...cUpdateSigningAuthoritySharedValidator.ministryUserId,
        ]
    },
    edit: {
        userTitle: [
            ...cUpdateSigningAuthoritySharedValidator.userTitle,
        ],
        firstName: [
            ...cUpdateSigningAuthoritySharedValidator.firstName,
        ],
        initial: [
            ...cUpdateSigningAuthoritySharedValidator.initial,
        ],
        lastName: [
            ...cUpdateSigningAuthoritySharedValidator.lastName,
        ],
        jobTitle: [
            ...cUpdateSigningAuthoritySharedValidator.jobTitle,
        ],
        emailAddress: [
            ...cUpdateSigningAuthoritySharedValidator.emailAddress,
        ],
        confirmEmail: [
            ...cUpdateSigningAuthoritySharedValidator.confirmEmail,
        ],
        phone: [
            ...cUpdateSigningAuthoritySharedValidator.phone,
        ],
        ext: [
            ...cUpdateSigningAuthoritySharedValidator.ext,
        ],
        fax: [
            ...cUpdateSigningAuthoritySharedValidator.fax,
        ],


        changeRole: [
            Validators.required,
        ],

        changeAdministeringFor: [
            Validators.required,
        ],
        administeringFor: [
            ...cUpdateSigningAuthoritySharedValidator.administeringFor,
        ],

        forIdentifyEmailAddress: [
            Validators.required,
            ...cUpdateSigningAuthoritySharedValidator.emailAddress,
        ],
        forIdentifyMinistryUserId: [
            ...cUpdateSigningAuthoritySharedValidator.ministryUserId,
        ]
    },
};

//#endregion


//#region Enumerations

export const cUpdateSigningAuthorityEnumeration = {
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
        ]
    },
    changeRole: [
            'No Change',
            'User',
            'Access Administrator',
        ],
};

//#endregion
