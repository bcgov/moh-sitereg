import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import {
    IMspOrganization,
    IMspUsers,
    IMspGroup,
    IMspSigningAuthority,
    IUser,
} from '@msp-register/interfaces';
import { IMspAccessAdmin } from '@msp-register/interfaces/i-msp-access-admins';
import {
    IOrgInformationDef,
    IUserDef,
    IAccessAdministratorDef,
    ICoreUserDef,
    IContractingOut,
    YesNo,
    ISigningAuthorityDef,
    ICoreUserMspDef,
    IMspGroupDef,
    ISiteRegRequest,
} from '@core/interfaces/i-http-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { IUserMsp } from '@msp-register/interfaces/base/i-user-msp';
import { IMspUser } from '@msp-register/interfaces/i-msp-user';
import { funcRandomNumber7Digit } from '@msp-register/constants';
import { isValidOptionalField } from '@msp-register/models/validator-helpers';

const apiUrl = environment.baseAPIUrl;

/* tslint:disable */
const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.pronin sapien nunc accuan eget.';
/* tslint:enable */

@Injectable({
    providedIn: 'root',
})
export class MspRegisterDataService {
    public requestFinalStatus: any;

    private agreementNumber$: BehaviorSubject<string> = new BehaviorSubject(
        '12345678'
    );
    private signingAuthorityName$: BehaviorSubject<
        string
    > = new BehaviorSubject('Sean');
    private agreementText$: BehaviorSubject<string> = new BehaviorSubject(text);
    private signingAuthorityAddress$: BehaviorSubject<
        string
    > = new BehaviorSubject('Here');

    get agreementNumber() {
        return this.agreementNumber$.asObservable();
    }

    get signingAuthorityName() {
        return this.signingAuthorityName$.asObservable();
    }

    get signingAuthorityAddress() {
        return this.signingAuthorityAddress$.asObservable();
    }

    get agreementText() {
        return this.agreementText$.asObservable();
    }

    updateSigningAuthorityName(name: string) {
        this.signingAuthorityName$.next(name);
    }

    updateSigningAuthorityAddress(addr: string) {
        this.signingAuthorityAddress$.next(addr);
    }

    constructor(private http: HttpClient) { }
    validateKeys(obj) {
        for (const key in Object.keys(obj)) {
            if (obj[key] === typeof obj) throw Error('invalid type');
        }
    }
    mapYesNo(bool: boolean): YesNo {
        if (bool) return 'yes';
        return 'no';
    }

    mapContractingOut(
        // tslint:disable-next-line: variable-name
        contracting_third_party: string,
        // tslint:disable-next-line: variable-name
        third_party_org_num?: string
    ): IContractingOut {
        third_party_org_num = third_party_org_num ? third_party_org_num : '';

        // if (!third_party_org_num) return { contracting_third_party, third_party_org_num? '' };
        return !(third_party_org_num === '') ?
            ({ contracting_third_party, third_party_org_num }) :
            ({ contracting_third_party });
    }

    mapBaseUser(obj: IUser): ICoreUserDef {
        // this.validateKeys(obj);
        // if (!obj.fax) obj.fax = null;
        // if (!obj.ext) obj.ext = null;
        // if (!obj.userTitle) obj.userTitle = null;
        // return {
        //     sa_curtesy_title: obj.userTitle as string,
        //     sa_last_name: obj.lastName as string,
        //     sa_first_name: obj.firstName as string,
        //     sa_initial: obj.initial as string,
        //     sa_job_title: obj.jobTitle as string,
        //     sa_email: obj.emailAddress as string,
        //     sa_phone_num: obj.phone as string,
        //     sa_phone_ext: obj.ext as string,
        //     sa_fax_num: obj.fax as string,
        // };
        return null;
    }

    //#region Common Defination Mapping

    /**
     * Maps boolean value to middleware defination ^[YN]$
     * @param val Boolean Parameter
     */
    mapYesNoDef(val: boolean): string {
        if (val) return 'Y';
        return 'N';
    }

    /**
     * Maps Administring for selected value to middleware defination ^[EIB]$
     * @param val string Parameter
     */
    mapAdministeringForDef(val: string): string {
        let result = '';
        switch (val) {
            case 'Employees': {
                result = 'E';
                break;
            }
            case 'International Students': {
                result = 'I';
                break;
            }
            case 'Employees and International Students': {
                result = 'B';
                break;
            }
        }
        // console.log(
        //     'mapDefAdministeringFor - translates(selected) "',
        //     val,
        //     ' = ',
        //     result,
        //     '"'
        // );
        return result;
    }

    /**
     * Maps application types to middleware user
     * @param obj application object
     */
    mapCoreUserDef(
        obj:
            | IUser
            | IUserMsp
            | IMspSigningAuthority
            | IMspAccessAdmin
            | IMspUser
    ): ICoreUserDef {
        // console.log('mapCoreUserDef', obj);
        this.validateKeys(obj);
        // const baseUser: ICoreUserDef = {
        //     curtesy_title:
        //         (obj.userTitle as string) &&
        //             !((obj.userTitle as string) === 'null')
        //             ? (obj.userTitle as string)
        //             : '',
        //     last_name: obj.lastName as string,
        //     first_name: obj.firstName as string,
        //     initial: obj.initial ? (obj.initial as string) : '',
        //     job_title: obj.jobTitle as string,
        //     email: obj.emailAddress as string,
        //     phone_num: obj.phone as string,
        //     phone_ext: obj.ext ? (obj.ext as string) : '',
        //     fax_num: obj.fax ? (obj.fax as string) : '',
        //     spg: this.mapAdministeringForDef(obj.administeringFor as string),
        // };
        const baseUser: ICoreUserDef = {

            first_name: obj.firstName as string,
            last_name: obj.lastName as string,
            job_title: obj.jobTitle as string,
            email: obj.emailAddress as string,
            phone_num: obj.phone as string,
            spg: this.mapAdministeringForDef(obj.administeringFor as string),

            // curtesy_title:
            // (obj.userTitle as string) &&
            //     !((obj.userTitle as string) === 'null')
            //     ? (obj.userTitle as string)
            //     : '',
            // initial: obj.initial ? (obj.initial as string) : '',
            // phone_ext: obj.ext ? (obj.ext as string) : '',
            // fax_num: obj.fax ? (obj.fax as string) : '',
        };

        if (isValidOptionalField(obj.userTitle as string)) baseUser.curtesy_title = obj.userTitle as string;
        if (isValidOptionalField(obj.initial as string)) baseUser.initial = obj.initial as string;
        if (isValidOptionalField(obj.ext as string)) baseUser.phone_ext = obj.ext as string;
        if (isValidOptionalField(obj.fax as string)) baseUser.fax_num = obj.fax as string;

        return baseUser as ICoreUserDef;
    }

    /**
     * This maps application Signing Authority, Access Admins to Middleware
     * @param obj application object
     */
    mapCoreUserMspDef(
        obj: IUserMsp | IMspSigningAuthority | IMspAccessAdmin
    ): ICoreUserMspDef {
        // console.log('mapCoreUserMspDef', obj);
        const baseUserMsp = this.mapCoreUserDef(obj) as ICoreUserMspDef;

        if (this.isTypeOfIUserMsp(obj)) {
            baseUserMsp.msp_access = this.mapYesNoDef(
                obj.directMspAccess as boolean
            );
            // baseUserMsp.ldap_id = '';
        }

        return baseUserMsp;
    }

    /**
     * verifies Object possess the directMspAccess property
     */
    isTypeOfIUserMsp(
        obj: IUserMsp | IMspSigningAuthority | IMspAccessAdmin
    ): obj is IUserMsp {
        return (
            (obj as IUserMsp).directMspAccess !== undefined
            // (obj as IUserMsp).ldap_id !== undefined // TBD: should be in IUserMSP
        );
    }

    deepCopy(obj: any, prefixProperty: string = ''): any {
        const newObject = {};
        Object.keys(obj).forEach((k) => {
            const newPropertyName = `${prefixProperty}${k}`;
            newObject[newPropertyName] = obj[k];
        });
        return newObject;
    }

    //#endregion

    //#region Orgnaization

    mapOrgInformation(obj: IMspOrganization): IOrgInformationDef {
        this.validateKeys(obj);
        if (!obj) throw Error('no organizaiton provided');

        // todo - frontend will provide value
        const orgNumber =
            (obj.thirdParty as boolean) === true
                ? obj.organizationNumber
                    ? (obj.organizationNumber as string)
                    : funcRandomNumber7Digit()
                : '';

        // tslint:disable-next-line: variable-name
        const contracting_out =
            (obj.thirdParty as boolean) === true ?
                this.mapContractingOut(
                    this.mapYesNoDef(obj.thirdParty as boolean),
                    orgNumber
                ) : this.mapContractingOut(
                    this.mapYesNoDef(obj.thirdParty as boolean)
                );

        // const organizationObject =  {
        //     contracting_out,
        //     org_name: obj.name as string,
        //     org_num: orgNumber,
        //     suite_num: obj.suite ? (obj.suite as string) : '',
        //     street_num: obj.street as string,
        //     street_name: obj.streetName as string,
        //     address_2: obj.addressLine2 ? (obj.addressLine2 as string) : '',
        //     city: obj.city as string,
        //     province: obj.province as string,
        //     postal_code: obj.postalCode as string,
        //     blue_cross: this.mapYesNoDef(obj.blueCross as boolean),
        //     org_spg: this.mapAdministeringForDef(
        //         obj.administeringFor as string
        //     ),
        // };

        // const organizationObject = (obj.thirdParty as boolean) === true ?
        //     {
        //         contracting_out,
        //         org_name: obj.name as string,
        //         org_num: orgNumber,
        //         suite_num: obj.suite ? (obj.suite as string) : '',
        //         street_num: obj.street as string,
        //         street_name: obj.streetName as string,
        //         address_2: obj.addressLine2 ? (obj.addressLine2 as string) : '',
        //         city: obj.city as string,
        //         province: obj.province as string,
        //         postal_code: obj.postalCode as string,
        //         blue_cross: this.mapYesNoDef(obj.blueCross as boolean),
        //         org_spg: this.mapAdministeringForDef(
        //             obj.administeringFor as string
        //         ),
        //     } :
        //     {
        //         contracting_out,
        //         org_name: obj.name as string,
        //         suite_num: obj.suite ? (obj.suite as string) : '',
        //         street_num: obj.street as string,
        //         street_name: obj.streetName as string,
        //         address_2: obj.addressLine2 ? (obj.addressLine2 as string) : '',
        //         city: obj.city as string,
        //         province: obj.province as string,
        //         postal_code: obj.postalCode as string,
        //         blue_cross: this.mapYesNoDef(obj.blueCross as boolean),
        //         org_spg: this.mapAdministeringForDef(
        //             obj.administeringFor as string
        //         ),
        //     };

        // required fields
        const organizationObject: IOrgInformationDef = {
            org_name: obj.name as string,
            // confirm with KS - if removed should be optional
            // suite_num: obj.suite ? (obj.suite as string) : '',
            street_num: obj.street as string,
            street_name: obj.streetName as string,
            city: obj.city as string,
            province: obj.province as string,
            postal_code: obj.postalCode as string,

            blue_cross: this.mapYesNoDef(obj.blueCross as boolean),
            org_spg: this.mapAdministeringForDef(
                obj.administeringFor as string
            ),
            contracting_out,
        };

        /**
         * Optional Fields
         */

        if (isValidOptionalField(obj.suite as string)) organizationObject.suite_num = obj.suite as string;
        if (isValidOptionalField(orgNumber)) organizationObject.org_num = orgNumber;
        if (isValidOptionalField(obj.addressLine2 as string)) organizationObject.address_2 = obj.addressLine2 as string;

        return organizationObject;
    }

    //#endregion

    //#region   Signing Authority

    mapObjectSigningAuthorityInformationDef(
        obj: IMspSigningAuthority
    ): ISigningAuthorityDef {
        // console.log('mapSigningAuthorityInformationDef', obj);
        const coreUserMspDef = this.mapCoreUserMspDef(
            obj as IMspSigningAuthority
        );
        const user = this.deepCopy(coreUserMspDef, 'sa_');
        return user as ISigningAuthorityDef;
    }

    mapSigningAuthorityInformationDef(
        obj: IMspSigningAuthority[] | IMspSigningAuthority
    ): ISigningAuthorityDef | ISigningAuthorityDef[] {
        if (Array.isArray(obj)) {
            // actual UI has not array for singing authority users, array seems unnecessary
            console.log('ARRAY mapSigningAuthorityInformationDef');
            const arr = [];
            obj.forEach((itm) => {
                this.validateKeys(itm);
                arr.push(this.mapSigningAuthorityInformationDef(itm));
            });
            return arr;
        }
        console.log('mapSigningAuthorityInformationDef', obj);
        const user = this.mapSigningAuthorityInformationDef(
            obj
        ) as ISigningAuthorityDef;
        return user as ISigningAuthorityDef;
    }

    //#endregion

    //#region Access Administrators

    mapObjectAccessAdministratorDef(
        obj: IMspAccessAdmin
    ): IAccessAdministratorDef {
        // console.log('mapObjectAccessAdministratorDef', obj);
        const coreUserMspDef = this.mapCoreUserMspDef(obj as IMspAccessAdmin);
        const user = this.deepCopy(coreUserMspDef, 'aa_');
        return user as IAccessAdministratorDef;
    }

    mapAccessAdministratorDef(
        obj: IMspAccessAdmin | IMspAccessAdmin[]
    ): IAccessAdministratorDef | IAccessAdministratorDef[] {
        if (Array.isArray(obj)) {
            // console.log('ARRAY mapAccessAdministratorDef');
            const arr = [];
            obj.forEach((itm) => {
                this.validateKeys(obj);
                arr.push(this.mapObjectAccessAdministratorDef(itm));
            });
            return arr;
        }
        const user = this.mapObjectAccessAdministratorDef(
            obj
        ) as IAccessAdministratorDef;
        return [user];
    }

    //#endregion

    //#region Users

    mapObjectUserDef(obj: IMspUser): IUserDef {
        // console.log('mapObjectUserDef', obj);
        const coreUserMspDef = this.mapCoreUserDef(obj as IMspUser);
        const user = this.deepCopy(coreUserMspDef, 'user_');
        return user as IUserDef;
    }

    mapUserDef(obj: IMspUser | IMspUser[]): IUserDef | IUserDef[] {
        if (Array.isArray(obj)) {
            // console.log('ARRAY mapUserDef');
            const arr = [];
            obj.forEach((itm) => {
                this.validateKeys(itm);
                arr.push(this.mapObjectUserDef(itm));
            });
            return arr;
        }
        const user = this.mapObjectUserDef(obj) as IUserDef;
        return [user];
    }

    //#endregion

    //#region Group Numbers

    /**
     * verfies if the organization is managed by thrid party
     * and a valid Organization Number is supplied
     */
    isThirdyPartyManagmentEnabled(obj: IOrgInformationDef) {
        return (
            obj.org_num &&
            obj.org_num.length > 0 && // should be 7 instead of 0 as per schema
            (obj.contracting_out &&
                obj.contracting_out.contracting_third_party &&
                obj.contracting_out.contracting_third_party === 'Y')
        );
    }

    mapObjectGroupDef(obj: IMspGroup): IMspGroupDef {
        // console.log('mapObjectGroupDef', obj);

        this.validateKeys(obj);
        const groupDef: IMspGroupDef = {
            mspgroup_num: obj.groupNumber as string,
            mspgroup_name: '',
            third_party: this.mapYesNoDef(obj.thirdParty as boolean),
        };

        return groupDef as IMspGroupDef;
    }

    mapGroupDef(
        obj: IMspGroup | IMspGroup[],
        isThirdyPartyManagmentEnabled: boolean
    ): IMspGroupDef | IMspGroupDef[] {
        if (Array.isArray(obj)) {
            // console.log('ARRAY mapGroupDef');
            const arr = [];
            obj.forEach((itm) => {
                this.validateKeys(itm);
                // map rule: if organization provided group number of third party to manage msp
                itm.thirdParty = isThirdyPartyManagmentEnabled
                    ? itm.thirdParty
                    : false;
                arr.push(this.mapObjectGroupDef(itm));
            });
            return arr;
        }

        // map rule: if organization provided group number of third party to manage msp
        obj.thirdParty = isThirdyPartyManagmentEnabled ? obj.thirdParty : false;
        const group = this.mapObjectGroupDef(obj) as IMspGroupDef;
        return [group];
    }

    //#endregion

    //#region Site Request

    /**
     * get Date in MM-DD-YYYY format
     * @param date Date
     */
    getDateinMMDDYYYY(date: Date) {
        let mm: string;
        let dd: string;
        let yyyy: string;

        let dateString: string;

        dd = date.getDate().toString();
        mm = (date.getMonth() + 1).toString();
        yyyy = date.getFullYear().toString();

        dateString =
            `${mm.length > 1 ? mm : '0' + mm}` +
            `-${dd.length > 1 ? dd : '0' + dd}` +
            `-${yyyy}`;

        return dateString;
    }

    mapSiteRegRequest(
        requestUUID: string,
        requestNumber: any,
        authorizedBySA: boolean,
        authorizedDate: Date,
        organizationInfo: IOrgInformationDef,
        signingAuthority: ISigningAuthorityDef,
        accessAdministrators: IAccessAdministratorDef[],
        OrganizationUsers: IUserDef[],
        mspGroups: IMspGroupDef[],
        AccessAdmminSameAsSigningAuthority?: boolean
    ): ISiteRegRequest {
        const dateAuthorize = this.getDateinMMDDYYYY(authorizedDate);
        // const registerationRequest: ISiteRegRequest = {
        //     request_uuid: requestUUID,
        //     request_num: requestNumber,
        //     org_information: organizationInfo ? organizationInfo : null,
        //     signing_authority_information: signingAuthority
        //         ? signingAuthority
        //         : null,
        //     aa_same_as_sa: AccessAdmminSameAsSigningAuthority
        //         ? this.mapYesNoDef(
        //             AccessAdmminSameAsSigningAuthority as boolean
        //         )
        //         : 'N',
        //     access_administrator: accessAdministrators
        //         ? accessAdministrators
        //         : [],
        //     users: OrganizationUsers ? OrganizationUsers : [],
        //     msp_group: mspGroups ? mspGroups : null,
        //     authorizedBySA: authorizedBySA
        //         ? this.mapYesNoDef(authorizedBySA)
        //         : 'N',
        //     authorizedDate: dateAuthorize,
        //     applicationType: 'mspdRegistration',
        // };

        const registerationRequest: ISiteRegRequest = {
            request_uuid: requestUUID,
            request_num: requestNumber,
            org_information: organizationInfo ? organizationInfo : null,
            signing_authority_information: signingAuthority
                ? signingAuthority
                : null,
            msp_group: mspGroups ? mspGroups : null,
            authorizedBySA: authorizedBySA
                ? this.mapYesNoDef(authorizedBySA)
                : 'N',
            authorizedDate: dateAuthorize,
        };

        // aa_same_as_sa: AccessAdmminSameAsSigningAuthority
        //         ? this.mapYesNoDef(
        //             AccessAdmminSameAsSigningAuthority as boolean
        //         )
        //         : 'N',
        //     access_administrator: accessAdministrators
        //         ? accessAdministrators
        //         : [],
        //     users: OrganizationUsers ? OrganizationUsers : [],
        //     applicationType: 'mspdRegistration',

        /**
         * Optional Fields
         */

        if (isValidOptionalField(AccessAdmminSameAsSigningAuthority as boolean)) {
            registerationRequest.aa_same_as_sa = this.mapYesNoDef(
                AccessAdmminSameAsSigningAuthority as boolean
            );
        }
        if (isValidOptionalField(accessAdministrators)) registerationRequest.access_administrator = accessAdministrators;
        if (isValidOptionalField(OrganizationUsers)) registerationRequest.users = OrganizationUsers;
        if (isValidOptionalField('mspdRegistration')) registerationRequest.applicationType = 'mspdRegistration';
        
        return registerationRequest;
    }
}
