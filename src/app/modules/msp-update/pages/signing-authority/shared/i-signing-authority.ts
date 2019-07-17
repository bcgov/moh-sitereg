import * as coreUser from '../../../common/i-coreuser';

// tslint:disable-next-line: no-empty-interface
export interface ISingingAuthority extends coreUser.ICoreUser {
}

export function getISigningAuthority(formValues): ISingingAuthority[] {
    if (!formValues) return;
    return coreUser.getICoreUser(formValues);
}

export function getISigningAuthorityReviewItems(iuser: ISingingAuthority[]): any {
    return coreUser.getICoreUserReviewItems(iuser as coreUser.ICoreUser[]);
}