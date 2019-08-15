import * as coreUser from '../../../common/i-coreuser';

// tslint:disable-next-line: no-empty-interface
export interface IAccessAdmin extends coreUser.ICoreUser {}

export function getIAccessAdmin(formValues): IAccessAdmin[] {
    if (!formValues) return;
    return coreUser.getICoreUser(formValues);
}

export function getIAccessAdminReviewItems(iuser: IAccessAdmin[]): any {
    return coreUser.getICoreUserReviewItems(iuser as coreUser.ICoreUser[]);
}
