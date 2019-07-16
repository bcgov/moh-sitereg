import * as coreUser from '../../../common/i-coreuser';

// tslint:disable-next-line: no-empty-interface
export interface IUser extends coreUser.ICoreUser {
}

export function getIUser(formValues): IUser[] {
    if (!formValues) return;
    return coreUser.getICoreUser(formValues);
}



export function getIUserReviewItems(iuser: IUser[]): any {
    return coreUser.getICoreUserReviewItems(iuser as coreUser.ICoreUser[]);
}