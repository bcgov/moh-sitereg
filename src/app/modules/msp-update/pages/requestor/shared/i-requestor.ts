export interface IRequestor {
    organizationNumber: string;
    emailAddress: string;
}

export function getIRequestor(formValues): IRequestor {
    if (!formValues) return;
    const iobj: IRequestor = {
        organizationNumber: formValues.organizationNumber
            ? formValues.organizationNumber
            : '',
        emailAddress: formValues.emailAddress ? formValues.emailAddress : '',
    };
    return iobj;
}
