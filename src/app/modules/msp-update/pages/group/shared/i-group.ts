import { isValidOptionalField } from '../../../common/update-json-map';

export interface IGroup {
    groupNo: string;
    thirdPartyAdmin?: boolean;
}

export function getIGroup(formValues): IGroup[] {
    if (!formValues) return;

    const iObjArray: IGroup[] = [];

    formValues.arrayOfForms.forEach(form => {
        const iObj: IGroup = {
            groupNo: form.groupNo ? form.groupNo : '',
        };
        if (isValidOptionalField(form.thirdPartyAdmin)) iObj.thirdPartyAdmin = form.thirdPartyAdmin;

        iObjArray.push(iObj);
        // console.log(iObj);
    });

    // console.log(iObjArray);
    return iObjArray;
}


export function getIGroupReviewItems(infoObjects: IGroup[]) {

    const items = [];

    infoObjects.forEach(element => {

        const item = [];
        item.push({ label: 'Group Number', value: element.groupNo });
        if (isValidOptionalField(element.thirdPartyAdmin)) item.push({ label: 'Third Party', value: element.thirdPartyAdmin });

        items.push(item);

    });
    return items;
}
