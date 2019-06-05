export function funcRemoveStrings(termToRemove: string[], sourceText: string) {
    let output = sourceText;
    termToRemove.forEach((term) => {
        output = output.replace(term, '');
    });
    return output;
}

export function funcRandomNumber8Digit() {
    return Math.floor(Math.random() * 89999999 + 10000000).toString();
}

export function funcRandomNumber7Digit() {
    return Math.floor(Math.random() * 8999999 + 1000000).toString();
}

export const APPLICATION_ROUTES = {
    REGISTER: 'register',
    UPDATE: 'update',
};

export const MSP_REGISTER_ROUTES = {
    ORGANIZATION: {
        order: 1,
        path: 'organization',
        fullpath: `${APPLICATION_ROUTES.REGISTER}/organization`,
        title: 'Register Organization',
    },
    SIGNING_AUTHORITY: {
        order: 2,
        path: 'signing-authority',
        fullpath: `${APPLICATION_ROUTES.REGISTER}/signing-authority`,
        title: 'Signing Authority',
    },
    ACCESS_ADMINS: {
        order: 3,
        path: 'access-admins',
        fullpath: `${APPLICATION_ROUTES.REGISTER}/access-admins`,
        title: 'Access Admins',
    },
    USERS: {
        order: 4,
        path: 'users',
        fullpath: `${APPLICATION_ROUTES.REGISTER}/users`,
        title: 'Users',
    },
    GROUP_NUMBERS: {
        order: 5,
        path: 'group-numbers',
        fullpath: `${APPLICATION_ROUTES.REGISTER}/group-numbers`,
        title: 'MSP Groups',
    },
    REVIEW: {
        order: 6,
        path: 'review',
        fullpath: `${APPLICATION_ROUTES.REGISTER}/review`,
        title: 'Review',
    },
    AUTHORIZE: {
        order: 7,
        path: 'authorize',
        fullpath: `${APPLICATION_ROUTES.REGISTER}/authorize`,
        title: 'Authorize',
    },
    CONFIRMATION: {
        order: 8,
        path: 'confirmation',
        fullpath: `${APPLICATION_ROUTES.REGISTER}/confirmation`,
        title: 'Confirmation',
    },
};
