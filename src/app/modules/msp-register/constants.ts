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

export const MSP_REGISTERATION_ROUTES = {
    ORGANIZATION: {
        order: 1,
        path: 'organization',
        title: 'Register Organization',
    },
    SIGNING_AUTHORITY: {
        order: 2,
        path: 'signing-authority',
        title: 'Signing Authority',
    },
    ACCESS_ADMINS: {
        order: 3,
        path: 'access-admins',
        title: 'Access Admins',
    },
    USERS: {
        order: 4,
        path: 'users',
        title: 'Users',
    },
    GROUP_NUMBERS: {
        order: 5,
        path: 'group-numbers',
        title: 'MSP Groups',
    },
    AUTHORIZE: {
        order: 6,
        path: 'authorize',
        title: 'Authorize',
    },
    CONFIRMATION: {
        order: 7,
        path: 'confirmation',
        title: 'Confirmation',
    },
};
