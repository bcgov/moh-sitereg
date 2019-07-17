export interface IRequestor {
    organizationNumber: string;
    emailAddress: string;
}

export function getIRequestor(formValues): IRequestor {
    if (!formValues) return;
    const iobj: IRequestor = {
        emailAddress: formValues.organizationNumber ? formValues.organizationNumber : '',
        organizationNumber: formValues.emailAddress ? formValues.emailAddress : '',
    };
    return iobj;
}
