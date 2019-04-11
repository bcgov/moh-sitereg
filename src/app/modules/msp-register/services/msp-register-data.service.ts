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
import { environment } from 'src/environments/environment';
import { IUserMsp } from '@msp-register/interfaces/base/i-user-msp';
import { IMspUser } from '@msp-register/interfaces/i-msp-user';

const apiUrl = environment.baseAPIUrl;

/* tslint:disable */
const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.pronin sapien nunc accuan eget.';
/* tslint:enable */

@Injectable({
    providedIn: 'root',
})
export class MspRegisterDataService {
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

    constructor(private http: HttpClient) {}
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
        contracting_third_party: YesNo,
        // tslint:disable-next-line: variable-name
        third_party_org_num?: string
    ): IContractingOut {
        if (!third_party_org_num) return { contracting_third_party };
        return { contracting_third_party, third_party_org_num };
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
        console.log(
            'mapDefAdministeringFor - translates(selected) "',
            val,
            ' = ',
            result,
            '"'
        );
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
        const baseUser: ICoreUserDef = {
            curtesy_title: obj.userTitle as string,
            last_name: obj.lastName as string,
            first_name: obj.firstName as string,
            initial: obj.initial as string,
            job_title: obj.jobTitle as string,
            email: obj.emailAddress as string,
            phone_num: obj.phone as string,
            phone_ext: obj.phone as string,
            fax_num: obj.fax as string,
            spg: this.mapAdministeringForDef(obj.administeringFor as string),
        };

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
        // tslint:disable-next-line: variable-name
        const contracting_out = this.mapContractingOut(
            this.mapYesNo(obj.thirdParty as boolean),
            '' // obj.organizationNumber as string  // TBD: opt-out, this is MSP group number
        );
        return {
            contracting_out,
            org_name: obj.name as string,
            org_num: '', // obj.organizationNumber as string, // TBD: opt-out, this is MSP group number
            suite_num: obj.suite as string,
            street_num: obj.street as string,
            street_name: obj.streetName as string,
            address_2: obj.addressLine2 as string,
            city: obj.city as string,
            province: obj.province as string,
            postal_code: obj.postalCode as string,
            blue_cross: this.mapYesNoDef(obj.blueCross as boolean),
            org_spg: this.mapAdministeringForDef(
                obj.administeringFor as string
            ),
        };
    }

    //#endregion

    //#region   Signing Authority

    mapObjectSigningAuthorityInformationDef(
        obj: IMspSigningAuthority
    ): ISigningAuthorityDef {
        console.log('mapSigningAuthorityInformationDef', obj);
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
        console.log('mapObjectAccessAdministratorDef', obj);
        const coreUserMspDef = this.mapCoreUserMspDef(obj as IMspAccessAdmin);
        const user = this.deepCopy(coreUserMspDef, 'aa_');
        return user as IAccessAdministratorDef;
    }

    mapAccessAdministratorDef(
        obj: IMspAccessAdmin | IMspAccessAdmin[]
    ): IAccessAdministratorDef | IAccessAdministratorDef[] {
        if (Array.isArray(obj)) {
            console.log('ARRAY mapAccessAdministratorDef');
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
        console.log('mapObjectUserDef', obj);
        const coreUserMspDef = this.mapCoreUserDef(obj as IMspUser);
        const user = this.deepCopy(coreUserMspDef, 'user_');
        return user as IUserDef;
    }

    mapUserDef(obj: IMspUser | IMspUser[]): IUserDef | IUserDef[] {
        if (Array.isArray(obj)) {
            console.log('ARRAY mapUserDef');
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

    mapObjectGroupDef(obj: IMspGroup): IMspGroupDef {
        console.log('mapObjectGroupDef', obj);

        this.validateKeys(obj);
        const groupDef: IMspGroupDef = {
            mspgroup_num: obj.groupNumber as string,
            // feedback-2019-04-03
            // mspgroup_name will always be null
            mspgroup_name: '',
            third_party: this.mapYesNoDef(obj.thirdParty as boolean),
        };

        return groupDef as IMspGroupDef;
    }

    mapGroupDef(obj: IMspGroup | IMspGroup[]): IMspGroupDef | IMspGroupDef[] {
        if (Array.isArray(obj)) {
            console.log('ARRAY mapGroupDef');
            const arr = [];
            obj.forEach((itm) => {
                this.validateKeys(itm);
                arr.push(this.mapObjectGroupDef(itm));
            });
            return arr;
        }
        const group = this.mapObjectGroupDef(obj) as IMspGroupDef;
        return [group];
    }

    //#endregion

    //#region Site Request

    mapSiteRegRequest(
        requestNumber: any,
        organizationInfo: IOrgInformationDef,
        signingAuthority: ISigningAuthorityDef,
        accessAdministrators: IAccessAdministratorDef[],
        OrganizationUsers: IUserDef[],
        mspGroups: IMspGroupDef[],
        AccessAdmminSameAsSigningAuthority?: boolean
    ): ISiteRegRequest {
        const registerationRequest: ISiteRegRequest = {
            request_num: requestNumber,
            org_information: organizationInfo ? organizationInfo : null,
            signing_authority_information: signingAuthority
                ? signingAuthority
                : null,
            aa_same_as_sa: AccessAdmminSameAsSigningAuthority
                ? this.mapYesNoDef(
                      AccessAdmminSameAsSigningAuthority as boolean
                  )
                : 'N',
            access_administrator: accessAdministrators
                ? accessAdministrators
                : [],
            users: OrganizationUsers ? OrganizationUsers : [],
            msp_group: mspGroups ? mspGroups : null,
        };

        return registerationRequest;
    }

    // createSiteregRequest(obj: ISiteRegRequest) {
    //     // http headers
    //     const contentHeaders = new HttpHeaders();
    //     contentHeaders.append('Accept', 'application/json; charset=utf-8');
    //     contentHeaders.append(
    //         'Content-Type',
    //         'application/json; charset=utf-8'
    //     );
    //     const body = obj;
    //     console.log(`%c SiteregRequest`, 'color: green;');
    //     console.log(body);
    //     // http request
    //     return this.http
    //         .put(environment.baseAPIUrl + '/sitereg/' + 'UUID', body, {
    //             headers: contentHeaders,
    //             responseType: 'json',
    //         })
    //         .toPromise()
    //         .catch((e) => {
    //             console.error(e);
    //         });
    // }
    // // return this.http.put(`${apiUrl}/sitereg`, obj).toPromise();

    //#endregion

    /*
    SH: not sure if this is required atm.
    */
    // mapGroupDef(obj: IMspGroupNumbers): IMspGroupDef {
    //   if (Array.isArray(obj)) {
    //     return obj.map(itm => {})
    //   }
    // }
}
