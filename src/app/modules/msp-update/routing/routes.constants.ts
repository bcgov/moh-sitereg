// todo: this is replicating in modules
// should come from common place
export const APPLICATION_ROUTES = {
    REGISTER: 'register',
    UPDATE: 'update',
};

export const ROUTES_UPDATE = {
    IDENTIFY: {
        order: 1,
        path: 'identify',
        fullpath: `${APPLICATION_ROUTES.UPDATE}/identify`,
        title: 'Identify Organization',
    },
    ORGANIZATION: {
        order: 1,
        path: 'organization',
        fullpath: `${APPLICATION_ROUTES.UPDATE}/organization`,
        title: 'Organization',
    },
    SIGNING_AUTHORITY: {
        order: 2,
        path: 'signing-authority',
        fullpath: `${APPLICATION_ROUTES.UPDATE}/signing-authority`,
        title: 'Signing Authority',
    },
    ACCESS_ADMINS: {
        order: 3,
        path: 'access-admins',
        fullpath: `${APPLICATION_ROUTES.UPDATE}/access-admins`,
        title: 'Access Admins',
    },
    USERS: {
        order: 4,
        path: 'users',
        fullpath: `${APPLICATION_ROUTES.UPDATE}/users`,
        title: 'Users',
    },
    GROUP_NUMBERS: {
        order: 5,
        path: 'group-numbers',
        fullpath: `${APPLICATION_ROUTES.UPDATE}/group-numbers`,
        title: 'MSP Groups',
    },
    REVIEW: {
      order: 6,
      path: 'review',
      fullpath: `${APPLICATION_ROUTES.UPDATE}/review`,
      title: 'Review',
    },
    SUBMIT: {
        order: 6,
        path: 'submit',
        fullpath: `${APPLICATION_ROUTES.UPDATE}/submit`,
        title: 'Submit',
    },
    CONFIRMATION: {
        order: 7,
        path: 'confirmation',
        fullpath: `${APPLICATION_ROUTES.UPDATE}/confirmation`,
        title: 'Confirmation',
    },
};
